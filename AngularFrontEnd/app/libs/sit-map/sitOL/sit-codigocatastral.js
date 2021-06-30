// argumentos validos texto, 2 o 3 numeros separados por guiones
if(typeof sit === 'undefined') var sit = {};

sit.CodigoCatastral = function(){
    this.distrito = 0;
    this.manzana = 0;
    this.predio = 0;
    this.subpredio = 0;
    this.modo = null;

    if (arguments.length === 1 && typeof arguments[0] === 'string') {
        var s = arguments[0],
            m;
        // manzana
        m = s.match(/^\s*(\d{1,3})\s*-\s*(\d{1,4})\s*$/);
        if (m && m.length > 0) {
            this.distrito = Number(m[1]);
            this.manzana = Number(m[2]);
            this.modo = "manzana";
        }

        //codigo catastral predio
        m = s.match(/^\s*(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})\s*$/);
        if (m && m.length > 0) {
            this.distrito = Number(m[1]);
            this.manzana = Number(m[2]);
            this.predio = Number(m[3]);
            this.modo = "predio";
        }

        //codigo subpredio
        m = s.match(/^\s*(\d{1,3})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})\s*-\s*(\d{1,4})\s*$/);
        if (m && m.length > 0) {
            this.distrito = Number(m[1]);
            this.manzana = Number(m[2]);
            this.predio = Number(m[3]);
            this.subpredio = Number(m[4]);
            this.modo = "subpredio";
        }

        //codigo sifca
        m = s.match(/^\s*(\d{15})\s*$/);
        if (m && m.length > 0) {
            var cs = m[1];
            this.distrito = Number(cs.substr(0, 3));
            this.manzana = Number(cs.substr(3, 4));
            this.predio = Number(cs.substr(7, 4));
            this.subpredio = Number(cs.substr(11, 4));
            this.modo = "sifca";
        }
    }

    if (arguments.length === 2) {
        this.distrito = arguments[0];
        this.manzana = arguments[1];
    }

    if (arguments.length === 3) {
        this.distrito = arguments[0];
        this.manzana = arguments[1];
        this.predio = arguments[2];
    }

    if (arguments.length === 4) {
        this.distrito = arguments[0];
        this.manzana = arguments[1];
        this.predio = arguments[2];
        this.subpredio = arguments[3];
    }
};

sit.CodigoCatastral.prototype.toString = function () {
    var sep = (arguments.length > 0) ? String(arguments[0]) : "";
    if (sep.length > 0) {
        return [this.distrito, this.manzana, this.predio, this.subpredio].join(sep);
    } else {
        return this.fillCeros(this.distrito, 3) + this.fillCeros(this.manzana, 4)
            + this.fillCeros(this.predio, 4) + this.fillCeros(this.subpredio, 4);
    }
};

sit.CodigoCatastral.prototype.toPredioString = function () {
    var sep = (arguments.length > 0) ? String(arguments[0]) : "";
    if (sep.length > 0) {
        return [this.distrito, this.manzana, this.predio].join(sep);
    } else {
        return this.fillCeros(this.distrito, 3) + this.fillCeros(this.manzana, 4)
            + this.fillCeros(this.predio, 4);
    }
};

sit.CodigoCatastral.prototype.toManzanaString = function () {
    var sep = (arguments.length > 0) ? String(arguments[0]) : "";
    if (sep.length > 0) {
        return [this.distrito, this.manzana].join(sep);
    } else {
        return this.fillCeros(this.distrito, 3) + this.fillCeros(this.manzana, 4);
    }
};

sit.CodigoCatastral.prototype.fillCeros = function (n, lenght) {
    var s = String(n);
    while (s.length < lenght) {
        s = "0" + s;
    }
    return s;
};

sit.CodigoCatastral.prototype.toArrayString = function () {
    return [this.fillCeros(this.distrito, 3), this.fillCeros(this.manzana, 4),
        this.fillCeros(this.predio, 4), this.fillCeros(this.subpredio, 4)];
};

