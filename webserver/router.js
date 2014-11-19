function route(pathname, handle, res) {
    if (/.js/.test(pathname)) {
        handle["js"](pathname, res);
    }

    if (/.css/.test(pathname)) {
        handle["css"](pathname, res);
    }

    if (/.png/.test(pathname)) {
        handle["png"](pathname, res);
    }

    if (typeof handle[pathname] === "function") {
        handle[pathname](res);
    }
}

exports.route = route;