import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/interface/RootState.interface";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import MapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
  Popup,
} from "react-map-gl";
import { getPostDetails } from "../api/post";
import { getLocation, getLocationInterval } from "../api/ztm";

interface MatchParams {
  id: string;
}

const navStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const geolocateStyle = {
  top: 100,
  left: 0,
  padding: "10px",
};

const MapView = ({ match }: RouteComponentProps<MatchParams>) => {
  const postId = match.params.id;

  const [lat, setLat] = useState(54);
  const [lon, setLon] = useState(18);
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewport, setViewport] = useState({
    height: "75vh",
    width: "100%",
    latitude: lat,
    longitude: lon,
    zoom: 13,
  });

  const dispatch = useDispatch();

  const { post, loading, error } = useSelector(
    (state: RootState) => state.postGetDetails
  );

  const { line, loading: getLocationLoading } = useSelector(
    (state: RootState) => state.getLocation
  );

  useEffect(() => {
    if (!post) {
      dispatch(getPostDetails(postId));
    } else {
      if (!line) {
        dispatch(getLocation(post.vehicleCode));
      } else {
        setLat(line.Lat);
        setLon(line.Lon);

        setViewport({
          height: "75vh",
          width: "100%",
          latitude: line.Lat,
          longitude: line.Lon,
          zoom: 13,
        });
      }
    }

    if (line) {
      setInterval(async () => {
        // @ts-ignore
        const { Lat, Lon } = await getLocationInterval(post.vehicleCode);

        setLat(Lat);
        setLon(Lon);
      }, 10000);
    }
  }, [dispatch, post, line, postId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          {getLocationLoading ? (
            <Loader />
          ) : line ? (
            <MapGL
              {...viewport}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(nextViewport: any) =>
                setViewport(nextViewport)
              }
            >
              <Link
                className="btn btn-danger"
                to="/dashboard"
                style={{ marginLeft: "90%" }}
              >
                <i className="fa fa-times-circle-o"></i>
              </Link>

              <NavigationControl style={navStyle} />
              <GeolocateControl style={geolocateStyle} />
              {/*@ts-ignore*/}
              <Marker longitude={lon} latitude={lat} onClick={setPopupInfo}>
                <i className="fa fa-bus marker"></i>
              </Marker>

              {popupInfo && (
                <Popup
                  tipSize={5}
                  offsetLeft={12}
                  longitude={lon}
                  latitude={lat}
                  closeOnClick={true}
                  onClose={setPopupInfo}
                >
                  <div className="text-center">
                    <h2 className="popup-text bold">{post.line}</h2>
                    <p className="popup-text">{post.direction}</p>
                  </div>
                </Popup>
              )}
            </MapGL>
          ) : (
            <Message>Invalid Vehicle Code</Message>
          )}
        </FormContainer>
      )}
    </Fragment>
  );
};

export default MapView;
