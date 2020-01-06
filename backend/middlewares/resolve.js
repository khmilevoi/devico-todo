const useResolve = () => {
  function resolve(body) {
    this.body = body;
    this.status = 200;
  }

  function badRequest(body) {
    this.body = body;
    this.status = 400;
  }

  function unauthorized(body) {
    this.body = body;
    this.status = 401;
  }

  function forbidden(body) {
    this.body = body;
    this.status = 403;
  }

  function notFound(body) {
    this.body = body;
    this.status = 404;
  }

  return (ctx, next) => {
    ctx.resolve = resolve;
    ctx.badRequest = badRequest;
    ctx.unauthorized = unauthorized;
    ctx.forbidden = forbidden;
    ctx.notFound = notFound;

    return next();
  };
};

export default useResolve;
