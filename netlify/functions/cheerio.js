
/*
 * La API
 */
const api = [
  require('./api/attributes'),
  require('./api/traversing'),
  require('./api/manipulation'),
  require('./api/css'),
  require('./api/forms')
];

/*
 * Instancia de cheerio
 */
const Cheerio = module.exports = function (selector, context, root, options) {
  if (!(this instanceof Cheerio)) return new Cheerio(selector, context, root, options);

  this.options = _.defaults(flattenOptions(options), this.options, defaultOptions);

  if (!selector) return this;

  if (root) {
    if (typeof root === 'string') root = parse(root, this.options, false);
    this._root = new Cheerio(root);
  }

  if (selector.cheerio) return selector;
  
  if (isNode(selector)) selector = [selector];

  if (Array.isArray(selector)) {
    _.forEach(selector, (elem, idx) => {
      this[idx] = elem;
    });
    this.length = selector.length;
    return this;
  }

  if (typeof selector === 'string' && isHtml(selector)) {
    return new Cheerio(parse(selector, this.options, false).children);
  }

  if (!context) {
    context = this._root;
  } else if (typeof context === 'string') {
    if (isHtml(context)) {
      context = new Cheerio(parse(context, this.options, false));
    } else {
      selector = [context, selector].join(' ');
      context = this._root;
    }
  } else if (!context.cheerio) {
    context = new Cheerio(context);
  }

  if (!context) return this;

  return context.find(selector);
};

/**
 * Mezclar en `estático`
 */
_.extend(Cheerio, require('./static'));

/*
 * Establecer una firma del objeto
 */
Cheerio.prototype.cheerio = '[cheerio object]';

/*
 * Convertir cheerio en un objeto tipo matriz
 */
Cheerio.prototype.length = 0;
Cheerio.prototype.splice = Array.prototype.splice;

/*
 * Hacer un objeto cheerio
 *
 * @api privado
 */
Cheerio.prototype._make = function (dom, context) {
  const cheerio = new this.constructor(dom, context, this._root, this.options);
  cheerio.prevObject = this;
  return cheerio;
};

/**
 * Convierte un objeto cheerio en una matriz
 */
Cheerio.prototype.toArray = function () {
  return this.get();
};

/**
 * Conecte la API
 */
api.forEach((mod) => {
  _.extend(Cheerio.prototype, mod);
});

const isNode = function (obj) {
  return obj.name || obj.type === 'text' || obj.type === 'comment';
};
