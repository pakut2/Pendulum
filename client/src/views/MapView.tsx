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
import { getLocation } from "../api/ztm";
import { postEnum } from "../store/enum/post.enum";
import { ztmEnum } from "../store/enum/ztm.enum";

interface MatchParams {
  id: string;
}

interface Viewport {
  height: string;
  width: string;
  latitude: number;
  longitude: number;
  zoom: number;
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

const MapView: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
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

  const {
    line,
    loading: getLocationLoading,
    error: getLocationError,
  } = useSelector((state: RootState) => state.getLocation);

  useEffect(() => {
    const getData = async () => {
      if (!post) {
        dispatch({ type: postEnum.POST_GET_DETAILS_REQUEST });
        try {
          const data = await getPostDetails(postId);
          dispatch({ type: postEnum.POST_GET_DETAILS_SUCCESS, payload: data });
        } catch (err: any) {
          dispatch({
            type: postEnum.POST_GET_DETAILS_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });
        }
      } else {
        if (!line) {
          dispatch({ type: ztmEnum.ZTM_GET_LOCATION_REQUEST });
          try {
            const data = await getLocation(post.vehicleCode);
            dispatch({
              type: ztmEnum.ZTM_GET_LOCATION_SUCCESS,
              payload: data,
            });
          } catch (err: any) {
            dispatch({
              type: ztmEnum.ZTM_GET_LOCATION_FAIL,
              payload:
                err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message,
            });
          }
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
    };
    getData();

    if (line) {
      setInterval(async () => {
        // @ts-ignore
        const { Lat, Lon } = await getLocation(post.vehicleCode);

        setLat(Lat);
        setLon(Lon);
      }, 10000);
    }
  }, [dispatch, post, line, postId]);

  return (
    <FormContainer>
      {loading || getLocationLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : getLocationError ? (
        <Message>{getLocationError}</Message>
      ) : (
        <Fragment>
          {line ? (
            <MapGL
              {...viewport}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              mapboxApiAccessToken="pk.eyJ1IjoicGFrdXQyIiwiYSI6ImNra3gxenFlcjAyYmgyb3AwbmdvYjg5cHoifQ.dEXAMvHoWip_DE7rJPoDhQ"
              onViewportChange={(nextViewport: Viewport) =>
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
                    {/*@ts-ignore*/}
                    <h2 className="popup-text bold">{post.line}</h2>
                    {/*@ts-ignore*/}
                    <p className="popup-text">{post.direction}</p>
                  </div>
                </Popup>
              )}
            </MapGL>
          ) : (
            <Message>Invalid Vehicle Code</Message>
          )}
        </Fragment>
      )}
    </FormContainer>
  );
};

export default MapView;
