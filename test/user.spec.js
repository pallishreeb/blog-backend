const chai = require("chai");
const nock = require("nock");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const config = require("../src/config/config");
chai.use(chaiHttp);

//import servers
const server = require("../src/server");

const {
    success_code,
    timeout,

} = require("./Utils");


describe("User APIs Test Cases", function() {

    //positive test cases - recordings add
    it("User testing positive Response", async function() {
        this.timeout(timeout);

        nock(`${config.Backend_api_base_url}`)
            .get("/recordings/add")
            .query(recordingsQueryParam)
            .reply(success_code, recordingAdd.success);
        let record = await chai
            .request(server)
            .get("/v1/services/recordings/add")
            .query(recordingsQueryParam);
        expect(record.body).to.have.keys("entry", "response", "status");
        expect(record.body.status).equals(success_code)

    });

})