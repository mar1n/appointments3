export const responseOkOf = body =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(body)
    });
export const responseErrorOf = () =>
    Promise.resolve({ ok: false });
export const requestBodyOf = fetchSpy =>
    JSON.parse(fetchSpy.mock.calls[0][1].body);