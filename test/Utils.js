const success_code = 200;
const failure_code = 500;
const res_success_status_code = "0";
const timeout = 5000;
const res_failure_status_code = "1";
const res_failure_code = "400";
const unsupportedRoute_code = 404;
const incorrectRequestError = "Incorrect_Request";
const ILfailure_status_code = 1001;
const timeout_failure = 1000
const unsupported_url = "http://mfwk-claroeru-hoolog.claroveo.net"
const unAuthorizedErrorCode = 401

const successObj = {
    entry: {},
    response: {},
    status: "0",
    msg: "OK",
};

const error_params_missing = {
    error: "missing parameters",
};

const auth_params = { authpn: "tataelxsi", authpt: "vofee7ohhecai" };

let undefinedErrorObj = {
    code: undefined,
    response: null,
}

let iLErrorObj = {
    status: 1001,
    msg: "ERROR",
    errors: {
        code: "il_error"
    }
}


let timeOutErrorObj = {
    code: "ECONNABORTED",
    response: undefined,
    status: 1001
};
let urlNotSupportedErrorObj = {
    code: "ENOTFOUND",
    response: undefined,
    status: 1001
};
let errorObj = {
    response: null,
    status: "1",
    errors: {
        error: [
            "error_params_value"
        ],
        code: "error_params"
    },
    msg: "ERROR"
};
let incorrectReqErrorObj = {
    code: "Incorrect_Request",
    response: undefined,
    status: 1001
};

let defaultErrorObj = {
        code: "default",
        response: undefined,
        status: 1001
    }
    //Object to add common values and refer in respect places..
const commonVals = {
    authpn: "tataelxsi",
    authpt: "vofee7ohhecai",
    device_category: "STB",
    device_type: "ptv",
    device_model: "zxv10",
    device_manufacturer: "ZTE",
    device_name: "generic",
    region: "peru",
    node: "peliculas",
    device_id: "ZTEATV41200122381",
    device_so: "Android 9",
    api_version: "5.93",
    user_hash: "NTc5MzQzNTl8MTYzODgxMzY3OXw1NjE0NmYxYzBkNzg4MjI0OTRlZDk0MmY3MTQwNTkyYjhkYTlmNzBhYmRmZmQyZDgxMA==",
    prueba: "test2",
    accepterms: "1",
    hks: "b8sdk84n7qeoo3vgnni4767f05",
    format: "json",
    suggest: "1",
    epg_version: "40373",
    user_id: "57934359",
    serial_id: "ZTEATV41200122381",
    sessionKey: "3c5b773dc773765539920a1ac3d944fa-peru",
    stream_type: "dashwv",
    group_id: "654066",
    preview: "1",
    superhighlight: "ninios",
    username: "testuser@gmail.com",
    password: "Test1234",
    invalidUsername: "project@gmail.com",
    invalidPassword: "1234Test",
    filterList: "34429,34451,34450,35707,36018,35706,38045,38064,34469,40156,41574",
    lasttouch: "615db208a8f2d",
    gamification_id: "61af15639295200ebe21aa26",
    event_id: "1025545002",
    reminder_id: "1631036227",
    channel_id: "9623324",
    type: "epg_event",
    exp_date: "20211214160000",
    user_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzY0NjUxMDUsImV4cCI6MTY0MTY0OTQwNSwidXNyIjp7InVzZXJfaWQiOiI1NzkzNDM1OSIsInVzZXJfdHlwZSI6IkNQRU5PVklQIiwidXNlcm5hbWUiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6IkFkbWluaXN0cmFkb3IiLCJsYXN0bmFtZSI6IkFwZWxsaWRvIiwiY291bnRyeV9jb2RlIjoiUEUiLCJyZWdpb24iOiJwZXJ1IiwiYWNjZXB0ZWRfdGVybXMiOjEsImdhbWlmaWNhdGlvbl9pZCI6IjYxOGE3YWNiODM0ZjMxNGRmYjJhZjVjMyIsInBhcmVudF9pZCI6IjU3OTM0MzU5IiwiYWNjb3VudCI6bnVsbCwiYWRtaW4iOnRydWV9fQ.HHw5GWKzh6LOnM_pM0Evl3FlOlocFuVvO4Dknc8uoqM",
    object_id: "740879",
    object_type: "5645645646464",
    payway_token: "",
    user_serie_id: "8a2637cea86dc18c72f2c082e39bb9f1"

};

let missingParamErrorObj = {
    code: "error_params",
    response: {
        data: {
            msg: "ERROR",
            errors: {
                error: [
                    "error_param"
                ],
            }
        },
    }
};

let recordingsSeriesDeleteSuccessObj = {
    entry: {},
    response: {},
    status: "200",
    msg: "OK",
};

let recordingsSeriesErrorObj = {
    "status": 401,
    "errors": [{
        "message": "Invalid user",
        "code": "PLY_REC_00003",
        "exception": "L3Zhci93d3cvcmVjb3JkaW5ncy1zkaW5ncy9SZWNvcmRpbmdzLnBocCAxODY4"
    }]
}

let internalErrorObj = {
    code: "ENOTFOUND",
    response: undefined,
    status: 1001
};
module.exports = {
    success_code,
    failure_code,
    error_params_missing,
    successObj,
    auth_params,
    res_success_status_code,
    timeout,
    commonVals,
    res_failure_status_code,
    res_failure_code,
    unsupportedRoute_code,
    incorrectRequestError,
    ILfailure_status_code,
    undefinedErrorObj,
    iLErrorObj,
    timeout_failure,
    timeOutErrorObj,
    urlNotSupportedErrorObj,
    errorObj,
    incorrectReqErrorObj,
    defaultErrorObj,
    missingParamErrorObj,
    unsupported_url,
    internalErrorObj,
    recordingsSeriesDeleteSuccessObj,
    recordingsSeriesErrorObj,
    unAuthorizedErrorCode
};