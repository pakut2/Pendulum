import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import configuration from "../../../shared/config/configuration";
import { EmailService } from "../../src/email/email.service";

describe("EmailService", () => {
  let service: EmailService;

  let sendMail: jest.Mock;
  beforeEach(async () => {
    sendMail = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when sending mail", () => {
    it("should return sent mail", () => {
      const mail = service.sendMail({
        to: "test@test.test",
        subject: "",
        html: "",
      });

      expect(mail).toEqual(expect.any(Object));
    });

    it("should throw an error if invalid data is provided", () => {
      return expect(service.sendMail({})).rejects.toThrow(
        "No recipients defined"
      );
    });
  });
});
