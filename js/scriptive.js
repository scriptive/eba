(function(win, doc) {
    "use strict";
    var eMain, eMenu, eDrag, eWidthPanel = 320, eWidthOffset, lt = "left", rt = "right", requestExtend = {}, requestParam = {}, offsetNormal = "", offsetReverse = "", config = {
        main: "",
        mainActive: "",
        menu: "",
        classActive: "active",
        classOverlay: "overlay",
        widthMax: eWidthPanel,
        widthMin: 0,
        widthLeftover: 60,
        widthUnit: "px",
        dragArea: 50,
        dragMin: 200,
        dataOffset: "offset",
        dataId: "id",
        dataLeft: lt,
        dataRight: rt,
        idUnique: "app:unique"
    }, configHash = {}, panel = {
        Current: "",
        Button: "",
        Click: function() {
            if (!eMenu) return;
            new Hammer(eMenu).on("tap", function(evt) {
                var e = evt.target;
                requestParam = {};
                if (e.dataset[config.dataId]) {
                    $.has.panelButton(e);
                    if ($.has.panelOffset(e.dataset[config.dataId])) {
                        requestParam.panel = panel.Current;
                        if ($.has.slided(offsetNormal)) {
                            panel.Toggle(config.widthMin);
                            $.on(3);
                        } else {
                            panel.Toggle(config.widthMax);
                            $.on(2);
                        }
                    }
                }
            });
        },
        Drag: function() {
            if (!eMain) return;
            var eDrag = new Hammer(config.mainActive ? eMain.querySelector(config.mainActive) : eMain);
            eDrag.add(new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                pointers: 0,
                threshold: 0
            }));
            eDrag.on("panstart", function(evt) {
                requestParam = {};
                if (eMain.dataset[config.dataLeft] && config.dragArea > $.has.left(evt.center.x)) {
                    $.has.panelOffset(eMain.dataset[config.dataLeft]);
                } else if (eMain.dataset[config.dataRight] && $.has.right(evt.center.x) < config.dragArea) {
                    $.has.panelOffset(eMain.dataset[config.dataRight]);
                } else {
                    offsetNormal = null;
                }
                if (offsetNormal) {
                    requestParam.panel = panel.Current;
                    $.has.panelButton(eMain.dataset[offsetNormal]);
                    if ($.has.slided(offsetNormal)) {
                        if ($.has.position(offsetReverse) < config.widthMin) {} else {
                            if ($.has.max()) {} else {}
                        }
                    } else {
                        panel.Current.style.zIndex = 2;
                        $.on(2);
                    }
                }
            }, true).on("pan", function(e) {
                if (offsetNormal) {
                    var x = offsetNormal == lt ? e.center.x : eWidthOffset - e.center.x;
                    requestParam.percentage = x / config.widthMax * 100;
                    if (requestParam.percentage > 0 && requestParam.percentage < 100) {
                        panel.Toggle(x);
                        $.on(4);
                    }
                }
            }, true).on("panend", function(e) {
                if (panel.Done()) $.on(3);
            }, true).on("pancancel", function(e) {
                if (panel.Done()) $.on(3);
            }, true);
        },
        Close: function() {
            if (!config.mainActive) return;
            var abc = eMain.querySelector(config.mainActive);
            var touchstartPanel = function(e) {
                e.preventDefault();
                panel.Toggle(config.widthMin);
                $.on(3);
                abc.removeEventListener("touchstart", touchstartPanel, true);
            };
            abc.addEventListener("touchstart", touchstartPanel, true);
        },
        Done: function() {
            if (offsetNormal) {
                var w = $.has.position(offsetNormal) > config.dragMin ? config.widthMax : config.widthMin;
                panel.Toggle(w);
                return w < 1;
            }
        },
        Toggle: function(x) {
            if (x <= config.widthMax) {
                if (x <= config.widthMin) {
                    eMain.style[offsetNormal] = $.pixel(config.widthMin);
                    if (panel.Current) panel.Current.style.zIndex = 1;
                    if (panel.Button) panel.Button.classList.remove(config.classActive);
                    eMain.classList.remove(config.classOverlay);
                    if ($.has.position(offsetReverse) < config.widthMin) {
                        eMain.style[offsetReverse] = $.pixel(config.widthMin);
                    }
                } else {
                    if (panel.Current) panel.Current.style.zIndex = 2;
                    eMain.style[offsetNormal] = $.pixel(x);
                    if ($.has.max()) {
                        if (doc.body.offsetWidth - config.widthMax <= config.widthMax) {
                            eMain.style[offsetReverse] = $.pixel(Math.abs(x) * -1);
                            requestParam.overlay = true;
                            if (x == config.widthMax) {
                                eMain.classList.add(config.classOverlay);
                                panel.Close();
                            }
                        } else {
                            eMain.style[offsetReverse] = $.pixel(config.widthMin);
                        }
                        if (panel.Button) $.toggleClass(panel.Button);
                        if (panel.Current) panel.Current.style.maxWidth = $.pixel(config.widthMax);
                    } else {
                        if (panel.Button) panel.Button.classList.add(config.classActive);
                    }
                }
            }
        }
    }, $ = {
        pixel: function(x) {
            return x + config.widthUnit;
        },
        has: {
            position: function(p) {
                var x = eMain.style[p];
                return x ? parseInt(x) : 0;
            },
            left: function(x) {
                return x + eMain.offsetWidth - (eMain.offsetWidth + $.has.position(lt));
            },
            right: function(x) {
                return eMain.offsetWidth + $.has.position(lt) - x;
            },
            panelOffset: function(id) {
                panel.Current = doc.getElementById(id);
                offsetNormal = panel.Current && panel.Current.dataset[config.dataOffset] ? panel.Current.dataset[config.dataOffset] : false;
                if (offsetNormal) {
                    offsetReverse = offsetNormal == lt ? rt : lt;
                    return true;
                }
            },
            panelButton: function(e) {
                if (e instanceof Element) {
                    panel.Button = e;
                } else {
                    panel.Button = doc.querySelector('[data-0="1"]'.replace("0", config.dataId).replace("1", e));
                }
            },
            slided: function(p) {
                return $.has.position(p) == config.widthMax;
            },
            max: function() {
                return eMain.offsetWidth - config.widthMax <= config.widthMax;
            },
            min: function() {
                return eMain.offsetWidth <= config.widthMax;
            },
            main: function(e) {
                if (!eMain && config.main) {
                    eMain = typeof config.main == "string" ? doc.querySelector(config.main) : config.main;
                    $.has.menu();
                }
            },
            menu: function() {
                if (!eMenu && config.menu) {
                    eMenu = typeof config.menu == "string" ? doc.querySelector(config.menu) : config.menu;
                }
            }
        },
        toggleClass: function(e) {
            var childs = e.parentElement.children;
            for (var i = 0; i < childs.length - 0; i++) {
                if (childs[i] == e) {
                    e.classList.add(config.classActive);
                } else {
                    childs[i].classList.remove(config.classActive);
                }
            }
        },
        hash: function() {
            var r = configHash, q, o = location.hash.split("?");
            if (o.length) {
                var hash = o[0].split("/");
                for (var i = 0; i < hash.length; i++) {
                    if (hash[i]) {
                        if (i == 0) {
                            r["page"] = hash[i].replace(/#/, "");
                        } else {
                            r[i] = hash[i];
                        }
                    }
                }
                if (o.length > 1) {
                    var search = /([^\?#&=]+)=([^&]*)/g;
                    while (q = search.exec(o[1])) r[q[1]] = q[2];
                }
            }
            return r;
        },
        merge: function() {
            var o = {}, i = 0, il = arguments.length, k;
            for (;i < il; i++) {
                for (k in arguments[i]) {
                    if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
                }
            }
            return o;
        },
        width: function() {
            eWidthOffset = Math.min(eMain.parentElement.offsetWidth, doc.documentElement.clientWidth);
            if (eWidthOffset - config.widthLeftover <= config.widthMax) {
                config.widthMax = eWidthOffset - config.widthLeftover;
            } else {
                config.widthMax = eWidthPanel;
            }
        },
        resize: function() {
            $.width();
            if (eWidthOffset - config.widthMax <= config.widthMax) {
                panel.Toggle(config.widthMin);
                $.on(3);
            }
        },
        ready: function(callback) {
            $.has.main();
            if (eMain) {
                $.width();
                if (eMenu) panel.Click();
                panel.Drag();
            }
            callback();
        },
        on: function(i) {
            i = [ "error", "ready", "panelOpen", "panelClose", "panelDrag" ][i];
            if (requestExtend.hasOwnProperty(i) && requestExtend[i] instanceof Function) {
                requestExtend[i](requestParam);
            }
        },
        r: function(e) {
            var self = this;
            self.element = e;
            self.ready = function(callback) {
                config = $.merge(config, self.element);
                win.addEventListener("DOMContentLoaded", function() {
                    if (callback instanceof Function) {
                        if (win.cordova && location.protocol == "file:") {
                            doc.addEventListener("deviceready", function() {
                                callback(self, scriptive);
                            }, false);
                        } else {
                            callback(self, scriptive);
                        }
                    }
                });
            };
            self.intPanel = function(callback) {
                config = $.merge(config, self.element);
                $.ready(function() {
                    eWidthPanel = config.widthMax;
                    if (callback instanceof Function) callback({
                        open: function(callback) {
                            requestExtend.panelOpen = callback;
                        },
                        close: function(callback) {
                            requestExtend.panelClose = callback;
                        },
                        drag: function(callback) {
                            requestExtend.panelDrag = callback;
                        }
                    });
                    if (eMain.dataset[config.open]) {
                        $.has.panelOffset(eMain.dataset[config.open]);
                    }
                    if (offsetNormal) {
                        $.has.panelButton(eMain.dataset[offsetNormal]);
                        requestParam.panel = panel.Current;
                        panel.Toggle(config.widthMax);
                        $.on(2);
                    }
                });
            };
            self.hashChange = function(callback) {
                win.addEventListener("hashchange", function(event) {
                    if (callback instanceof Function) $.hash(), $.resize(), callback(configHash);
                }, false);
            };
            self.resizeEvent = function(callback) {
                win.addEventListener("resize", function(event) {
                    $.resize();
                    if (callback instanceof Function) callback(event);
                }, false);
            };
            self.on = function(id, callback) {
                requestExtend[id] = callback;
            };
            self.click = function(callback) {
                if (self.element && callback instanceof Function) new Hammer(self.element).on("tap", callback);
                return self;
            };
            self.attr = function(id, name) {
                if (arguments.length >= 2) {
                    self.element.setAttribute(id, name);
                } else {
                    return self.element.getAttribute(id);
                }
                return self;
            };
            self.addClass = function(name) {
                try {
                    self.element.classList.add(name);
                } catch (e) {
                    self.attr("class", name);
                } finally {}
                return self;
            };
            self.toggleClass = function(name, idea) {
                self.element.classList.toggle(name, idea);
                return self;
            };
            self.removeClass = function(name) {
                self.element.classList.remove(name);
                return self;
            };
            self.setContent = function(name) {
                if (self.element && self.element instanceof Element) self.element.innerHTML = name;
                return self;
            };
            self.createElement = function(e) {
                if (arguments.length) {
                    return doc.createElement(e);
                } else {
                    self.element = doc.createElement(self.element);
                }
                return self;
            };
            self.appendChild = function(e) {
                if (!(e instanceof Element)) e = self.createElement(e);
                if (arguments.length > 1) {
                    self.element.appendChild(e);
                } else {
                    self.element = self.element.appendChild(e);
                }
                return self;
            };
            self.removeChild = function(e) {
                self.element = arguments.length ? e : self.element;
                while (self.element.firstChild) {
                    self.element.removeChild(self.element.firstChild);
                }
                return self;
            };
            self.selectChild = function(e, i) {
                self.element = i ? self.element.querySelectorAll(e) : self.element.querySelector(e);
                return self;
            };
            self.extension = function(o) {
                if (o instanceof Object) for (var i in o) if (o.hasOwnProperty(i)) self[i] = o[i];
                return self;
            };
            self.isEmpty = function(o) {
                o = arguments.length ? arguments[0] : self.element;
                if (self.isObject(o)) {
                    return Object.keys(o).length === 0;
                } else if (self.isArray(o)) {
                    return o.length;
                } else {
                    return true;
                }
            };
            self.isFunction = function() {
                if ((arguments.length ? arguments[0] : self.element) instanceof Function) return true;
            };
            self.isObject = function() {
                if ((arguments.length ? arguments[0] : self.element) instanceof Object) return true;
            };
            self.isArray = function() {
                if ((arguments.length ? arguments[0] : self.element) instanceof Array) return true;
            };
            self.isNumeric = function() {};
            self.inArray = function() {
                return self.element.indexOf(arguments[0]) > -1;
            };
            self.merge = function() {
                var o = self.element, i = 0, il = arguments.length, k;
                for (;i < il; i++) {
                    for (k in arguments[i]) {
                        if (arguments[i].hasOwnProperty(k)) o[k] = arguments[i][k];
                    }
                }
                return self.element;
            };
            self.each = function() {
                var o = arguments.length > 1 ? arguments[0] : self.element, callback = arguments.length > 1 ? arguments[1] : arguments[0], a = {
                    object: function() {
                        var s = 0, l = Object.keys(o).length;
                        for (var i in o) {
                            if (o.hasOwnProperty(i)) {
                                s++;
                                callback(i, o[i], o, s == l);
                            }
                        }
                    },
                    array: function() {
                        var l = o.length;
                        for (var i = 0; i < l; i++) {
                            callback(i, o[i], o, i == l - 1);
                        }
                    }
                };
                return a[self.isObject(o) ? "object" : "array"]();
            };
            self.storage = {
                name: {},
                db: win.localStorage,
                select: function(key, val) {
                    var val = this.db.getItem(this.ids(key));
                    try {
                        this.name[key] = val ? JSON.parse(val) : {};
                    } catch (e) {
                        this.name[key] = val;
                    } finally {
                        return this;
                    }
                },
                insert: function(key, val) {
                    var id = this.ids(key);
                    if (typeof val == "object") {
                        this.db.setItem(id, JSON.stringify(val));
                    } else {
                        this.db.setItem(id, val);
                    }
                    this.name[key] = val;
                    return this;
                },
                update: function(key, val) {
                    return this.insert(key, val || this.name[key]);
                },
                delete: function(key) {
                    this.db.removeItem(this.ids(key));
                    return this;
                },
                deleteAll: function(key) {
                    this.db.clear();
                    return this;
                },
                ids: function(key) {
                    return config.idUnique.replace(/unique/, key);
                }
            };
        }
    };
    win.scriptive = function(e) {
        return new $.r(e);
    };
})(window, document);