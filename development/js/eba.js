/*!
    EBA -- Effortless bible analysis
    Version 1.0.0
    https://khensolomon.github.io/effortless-bible-analysis
    (c) 2016
*/
$(function() {
    var e = "ontouchstart" in document.documentElement ? "click" : "click";
    window.eba = {
        navUA: navigator.userAgent,
        device: function() {
            var e = [ "android", "webos", "iphone", "ipad", "blackberry" ];
            for (i in e) {
                if (this.navUA.toLowerCase().indexOf(e[i]) !== -1) {
                    return this.setting.device = e[i];
                }
            }
            return "desktop";
        },
        setting: {
            classname: {
                active: "active",
                inactive: "inactive",
                filter: "filter"
            },
            language: {
                eba: {
                    xml: "EBA",
                    name: "EBA",
                    description: "Unknown"
                },
                data: {
                    xml: "data",
                    name: "Zolai",
                    description: "Zolai"
                }
            },
            device: false
        },
        db: {
            setup: function() {},
            name: {},
            storage: window.localStorage,
            select: function(e, a) {
                this.name[e] = this.storage.getItem(e);
                if (a) {
                    this.name[e] = this.name[e] ? JSON.parse(this.name[e]) : {};
                }
                return this;
            },
            insert: function(e, a) {
                this.storage.setItem(e, a);
                return this;
            },
            update: function(e) {
                if ($.isPlainObject(this.name[e])) {
                    this.storage.setItem(e, JSON.stringify(this.name[e]));
                } else {
                    this.storage.setItem(e, this.name[e]);
                }
                return this;
            },
            delete: function(e) {
                this.storage.removeItem(e);
                return this;
            }
        },
        xml: {
            data: {},
            set: function(e, a) {
                Object.defineProperty(this.data, e, {
                    value: a
                });
            },
            remove: function() {},
            import: function(e, a) {
                eba.setting.language[a] = {
                    xml: a,
                    name: "(?) " + a + " temp",
                    description: "Unknown"
                };
                return this.load(e, a);
            },
            get: function(e, a) {
                if (!e) {
                    if (Object.keys(this.data)[0]) {
                        e = Object.keys(this.data)[0];
                        console.log(e);
                    } else {
                        e = Object.keys(eba.setting.language)[0];
                    }
                }
                if (this.data.hasOwnProperty(e)) {
                    var t = $.Deferred();
                    if (a) {
                        a();
                    }
                    t.resolve(eba.xml.data[e]);
                    return t.promise();
                } else {
                    return this.load("db", e, a);
                }
            },
            load: function(e, a, t) {
                return $.ajax({
                    type: "GET",
                    url: "url/file.xml".replace("url", e).replace("file", eba.setting.language[a].xml),
                    cache: false,
                    dataType: "xml",
                    xhr: function() {
                        var e = new window.XMLHttpRequest();
                        if (t) {
                            e.addEventListener("progress", t, false);
                        }
                        return e;
                    }
                }).done(function(e) {
                    eba.xml.set(a, e);
                }).fail(function() {}).always(function() {});
            }
        },
        page: {
            menu: {
                title: "Effortless bible analysis",
                header: {
                    about: {
                        attr: {
                            class: "fix",
                            go: "about"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-info"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Effortless bible analysis"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "setting"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-cog"
                            }
                        }
                    }
                }
            },
            setting: {
                name: "Setting",
                title: "Setting",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Setting"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "about"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-info"
                            }
                        }
                    }
                }
            },
            language: {
                name: "Language",
                title: "Language",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Language"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "setting"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-cog"
                            }
                        }
                    }
                }
            },
            about: {
                name: "About",
                title: "About",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "About"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "setting"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-cog"
                            }
                        }
                    }
                }
            },
            category: {
                name: "Category",
                title: "Category",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Category"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "search"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-search"
                            }
                        }
                    }
                }
            },
            verse: {
                title: "Verse",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Verse"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix filter"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-map-o"
                            },
                            job: function(a) {
                                a.bind(e, function(e) {
                                    $(this).parent().toggleClass(eba.setting.classname.active);
                                });
                            }
                        }
                    }
                }
            },
            search: {
                name: "Search",
                title: "Search",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title"
                        },
                        child: {
                            tag: "<form>",
                            attr: {
                                name: "search"
                            },
                            job: function() {
                                return $("<input>", {
                                    type: "text",
                                    name: "q",
                                    id: "q",
                                    placeholder: "search..."
                                });
                            }
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "search"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-search"
                            }
                        }
                    }
                }
            },
            bookmark: {
                name: "Bookmark",
                title: "Bookmark",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Bookmark"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "setting"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-cog"
                            }
                        }
                    }
                }
            },
            daily: {
                name: "Daily Verse",
                title: "Daily Verse",
                header: {
                    home: {
                        attr: {
                            class: "fix",
                            go: "menu"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-menu"
                            }
                        }
                    },
                    title: {
                        attr: {
                            class: "title",
                            text: "Daily Verse"
                        }
                    },
                    setting: {
                        attr: {
                            class: "fix",
                            go: "setting"
                        },
                        child: {
                            tag: "<a>",
                            attr: {
                                class: "icon-cog"
                            }
                        }
                    }
                }
            }
        },
        watch: {
            go: function(e) {
                if (!e || !eba.content.hasOwnProperty(e)) {
                    e = eba.db.name.query.page;
                    if (!eba.content.hasOwnProperty(e)) {
                        e = "menu";
                    }
                }
                eba.layout.identity(e);
                return eba.content[e];
            },
            filter: function(e) {
                e.toggleClass(eba.setting.classname.active);
            }
        },
        layout: {
            header: {
                change: function(a) {
                    var t = $("<ul>");
                    if (eba.page[a].hasOwnProperty("header")) {
                        $.each(eba.page[a].header, function(a, n) {
                            $("<li>", n.attr).append(function() {
                                if (n.child) {
                                    var e = $(n.child.tag, n.child.attr);
                                    return e.html(function() {
                                        if (n.child.hasOwnProperty("job")) {
                                            return n.child.job(e);
                                        }
                                    });
                                }
                            }).bind(e, function(e) {
                                var a = $(this).attr("go");
                                if (a) {
                                    eba.watch.go(a)();
                                }
                            }).appendTo(t);
                        });
                        return t;
                    }
                }
            },
            main: {
                create: function() {
                    return $("<main>").append($("<div>", {
                        class: "container active"
                    }).append($("<div>", {
                        class: "msg"
                    }).append()));
                }
            },
            footer: function() {},
            identity: function(e) {
                $("body").attr("id", e);
                $("header").html(this.header.change(e)).promise().done(function() {
                    eba.db.name.query.page = e;
                    eba.db.update("query");
                });
            }
        },
        init: function(e) {
            var a = $.Deferred();
            a.notify("initiating");
            setTimeout(function() {
                $("body").addClass(eba.device()).promise().then(function() {
                    a.notify("configuration");
                    setTimeout(function() {
                        var e = eba.db.select("setting", true);
                        if (e.name.setting.hasOwnProperty("class")) {
                            $.each(e.name.setting.class, function(e, a) {
                                $("body").addClass(a);
                            });
                        } else {
                            e.name.setting.class = {};
                        }
                        eba.db.select("bookmark", true);
                        eba.db.select("query", true);
                        eba.db.select("suggestion", true);
                        eba.db.select("language", true);
                    }, 200);
                }).then(function() {
                    setTimeout(function() {
                        a.notify("XML");
                        eba.xml.get(null, function(e) {
                            var t = 70;
                            if (e.lengthComputable) {
                                t = Math.round(e.loaded / e.total * 70);
                            }
                            a.notify(t);
                        }).done(function(e) {
                            a.notify("Data");
                        }).fail(function(e, t) {
                            a.notify(90);
                            if (e.statusText) {
                                a.reject(e.statusText);
                            } else {
                                a.reject(t);
                            }
                        });
                    }, 400);
                }).then(function() {
                    setTimeout(function() {
                        if (eba.setting.device) {
                            a.notify(90);
                        } else {
                            a.notify(99).reject("connecting to device");
                        }
                    }, 600);
                }).then(function() {
                    setTimeout(function() {
                        a.notify(100).resolve("ready");
                    }, 800);
                    $(document).on("submit", "form", function(e) {
                        e.preventDefault();
                    });
                });
            }, 100);
            return a.promise();
        },
        msg: function(e) {
            if ($("div.msg").length) {
                $("div.msg").fadeToggle("fast", function() {
                    $(this).html(e);
                });
            } else {
                return $("<div>", {
                    class: "msg"
                }).html(e).prependTo("div.container");
            }
        },
        task: {
            bookmark: function(e, a, t, n, i) {
                var s = eba.db.name.bookmark;
                if (e.hasClass(eba.setting.classname.active)) {
                    s[a][t][n].splice(s[a][t][n].indexOf(i), 1);
                    if (s[a][t][n].length <= 0) {
                        delete s[a][t][n];
                        if ($.isEmptyObject(s[a][t])) {
                            delete s[a][t];
                            if ($.isEmptyObject(s[a])) {
                                delete s[a];
                            }
                        }
                    }
                    if (e.parent().hasClass("bookmark")) {
                        e.fadeOut(300);
                    }
                } else {
                    if (!s.hasOwnProperty(a)) {
                        s[a] = {};
                    }
                    if (!s[a].hasOwnProperty(t)) {
                        s[a][t] = {};
                    }
                    if (!s[a][t].hasOwnProperty(n)) {
                        s[a][t][n] = [];
                    }
                    s[a][t][n].push(i.toString());
                }
                e.toggleClass(eba.setting.classname.active).promise().done(function() {
                    eba.db.update("bookmark");
                });
            },
            hasBookmark: function(e, a, t, n) {
                var i = eba.db.name.bookmark;
                if (i.hasOwnProperty(e)) {
                    if (i[e].hasOwnProperty(a)) {
                        if (i[e][a].hasOwnProperty(t)) {
                            return $.inArray(n, i[e][a][t]) >= 0;
                        }
                    }
                }
            },
            textReplace: function(e, a) {
                return $.type(a) === "string" ? e.replace(new RegExp(a, "gi"), "<b>$&</b>") : e;
            },
            numReplace: function(e) {
                return e.replace(/\d+/g, "<sup>$&</sup>");
            }
        },
        content: {
            menu: function() {
                var a = $("<ul>", {
                    class: "menu"
                }).appendTo($("div.container").empty());
                $.each(eba.page, function(t, n) {
                    if (n.name) {
                        $("<li>").append(n.name).bind(e, function(e) {
                            eba.watch.go(t)();
                        }).appendTo(a);
                    }
                });
            },
            setting: function() {
                var a = {
                    fontsize: {
                        title: "font size",
                        style: "body {font-size:$100%;}",
                        option: {
                            "80%": {
                                title: "1",
                                class: "size-small-extra"
                            },
                            "90%": {
                                title: "2",
                                class: "size-small"
                            },
                            "100%": {
                                title: "3",
                                class: "size-normal"
                            },
                            "120%": {
                                title: "4",
                                class: "size-large"
                            },
                            "150%": {
                                title: "5",
                                class: "size-large-extra"
                            }
                        }
                    },
                    background: {
                        title: "background color",
                        style: "body {background-color:$white;}",
                        option: {
                            "#ffffff": {
                                class: "color-white"
                            },
                            "#e1e1e1": {
                                class: "color-lightgray"
                            },
                            "#7f7f7f": {
                                class: "color-dimgrey"
                            },
                            "#b97a59": {
                                class: "color-chocolate"
                            },
                            "#880016": {
                                class: "color-darkred"
                            },
                            "#ed1b24": {
                                class: "color-red"
                            },
                            "#fef102": {
                                class: "color-gold"
                            },
                            "#24b04d": {
                                class: "color-green"
                            },
                            "#3f47cc": {
                                class: "color-darkblue"
                            }
                        }
                    }
                };
                var t = $("<ul>", {
                    class: "setting"
                }).appendTo($("div.container").empty());
                var n = eba.db.select("setting", true);
                if (!n.name.setting.hasOwnProperty("class")) {
                    n.name.setting.class = {};
                }
                $.each(a, function(a, i) {
                    $("<li>", {
                        class: "title"
                    }).append(i.title).appendTo(t);
                    $("<li>", {
                        class: a
                    }).append(function() {
                        var t = $(this);
                        $.each(i.option, function(i, s) {
                            if (n.name.setting.class.hasOwnProperty(a)) {
                                var o = n.name.setting.class[a] == s.class ? eba.setting.classname.active : eba.setting.classname.inactive;
                            } else {
                                var o = eba.setting.classname.inactive;
                            }
                            $("<span>", s).addClass("icon-").addClass(o).bind(e, function(e) {
                                $(this).addClass(eba.setting.classname.active).siblings().removeClass(eba.setting.classname.active);
                                if (n.name.setting.class.hasOwnProperty(a)) {
                                    if ($("body").hasClass(n.name.setting.class[a])) {
                                        $("body").removeClass(n.name.setting.class[a]);
                                    }
                                }
                                if (!$("body").hasClass(s.class)) {
                                    $("body").addClass(s.class);
                                }
                                n.name.setting.class[a] = s.class;
                                n.update("setting");
                            }).appendTo(t);
                        });
                    }).appendTo(t);
                });
            },
            language: function() {
                var a = eba.db.name.language;
                var t = eba.db.name.query;
                var n = $("<ul>", {
                    class: "language"
                }).appendTo($("div.container").empty());
                $.each(eba.setting.language, function(i, s) {
                    if (a.hasOwnProperty(i)) {
                        var o = eba.setting.classname.active;
                    } else {
                        var o = eba.setting.classname.inactive;
                    }
                    $("<li>", {
                        class: i
                    }).addClass(o).append($("<p>", {
                        class: "lang icon-flag-empty"
                    }).append(s.name).bind(e, function(e) {
                        if (a.hasOwnProperty(i)) {
                            t.language = i;
                            eba.watch.go("category")(i);
                        } else {
                            eba.msg("Selected language is not activited!");
                        }
                    }), $("<p>", {
                        class: "download icon-"
                    }).append($("<span>", {
                        text: "download"
                    })).bind(e, function(e) {
                        $(this).parent().toggleClass(eba.setting.classname.active).promise().done(function() {
                            if (a.hasOwnProperty(i)) {
                                delete a[i];
                                if (Object.keys(a)[0]) {
                                    t.language = Object.keys(a)[0];
                                } else {
                                    delete t.language;
                                }
                            } else {
                                t.language = i;
                                a[i] = {};
                            }
                            eba.db.update("query");
                            eba.db.update("language");
                        });
                    })).appendTo(n);
                });
            },
            about: function() {
                var e = {
                    name: "Effortless bible analysis",
                    version: "version: 1.0.0",
                    description: "this is it!",
                    author: "tuang"
                };
                var a = $("<ul>", {
                    class: "about"
                }).appendTo($("div.container").empty());
                $.each(e, function(e, t) {
                    $("<li>", {
                        class: e
                    }).append(t).appendTo(a);
                });
            },
            category: function() {
                var a = eba.db.name.query;
                if (a.language) {
                    eba.xml.get(a.language).done(function(t) {
                        var n = $("<ol>", {
                            class: "category"
                        }).appendTo($("div.container").empty());
                        $(t).find("index").children("section").each(function() {
                            var t = $(this), i = t.attr("id"), s = t.attr("name");
                            $("<li>").append($("<a>", {
                                class: "icon-right-open"
                            }).append(s).bind(e, function(e) {
                                a.category = i;
                                eba.watch.go("verse")(i);
                            })).appendTo(n);
                        });
                    });
                } else {
                    $("div.container").html($("<div>", {
                        class: "msg error"
                    }).html("Language has not been selected!"));
                }
            },
            verse: function() {
                var a = eba.db.name.query;
                var t, n = [], i = [];
                eba.xml.get(a.language).done(function(s) {
                    var o = $("<ul>", {
                        class: "content"
                    }).appendTo($("div.container").empty());
                    t = $(s);
                    $(".title").html(t.find("index").children('section[id="0"]'.replace("0", a.category)).text());
                    t.find("book").find('category[id="0"]'.replace(0, a.category)).children("verse").each(function() {
                        var s = $(this), r = s.attr("book"), c = s.attr("chapter"), l = s.attr("verse"), d = s.attr("tag"), g = t.find("bookname").children('row[id="0"]'.replace("0", r)).text(), u = s.text(), p = r <= 39 ? 1 : 2;
                        n.push(d);
                        i.push(p);
                        var f = eba.task.hasBookmark(a.category, r, c, l);
                        var m = f ? eba.setting.classname.active : eba.setting.classname.inactive;
                        var h = t.find("tag").children('row[id="0"]'.replace("0", d)).text().toLowerCase();
                        var b = t.find("testament").children('row[id="0"]'.replace("0", p)).text().replace(" ", "-").toLowerCase();
                        $("<li>", {
                            class: h
                        }).addClass(m).addClass(b).append($("<h3>").append($("<i>", {
                            class: "icon-bookmark"
                        }).bind(e, function(e) {
                            eba.task.bookmark($(this).parents("li"), a.category, r, c, l);
                        }), "0 1:2".replace(0, g).replace(1, c).replace(2, l)), $("<p>").append(eba.task.numReplace(u))).appendTo(o);
                    });
                }).then(function() {
                    n = $.unique(n);
                    i = $.unique(i);
                    var a = $("<li>").appendTo($("<ul>").appendTo($("li.filter")));
                    var s = $("<ul>").appendTo(a);
                    $.each(n, function(a, n) {
                        var i = t.find("tag").children('row[id="0"]'.replace("0", n)).text();
                        var o = i.toLowerCase();
                        $("<li>", {
                            class: "icon-ok active"
                        }).addClass(o).html(i).bind(e, function(e) {
                            $("div.container ul li").each(function(e, a) {
                                if ($(this).hasClass(o)) {
                                    $(this).fadeToggle("fast");
                                }
                            }).promise().done($(this).toggleClass("active"));
                        }).appendTo(s);
                    });
                });
            },
            search: function() {
                var a = eba.db.name.query;
                var t = function() {
                    var t = eba.db.name.suggestion;
                    var i = 0;
                    var s = 0;
                    if (a.language && a.q) {
                        eba.xml.get(a.language).done(function(n) {
                            var o = $(eba.xml.data[a.language]);
                            var r = $("<ul>", {
                                class: "content search"
                            }).appendTo($("div.container").empty());
                            o.find("book").find("category").children("verse").each(function() {
                                var t = $(this), n = t.attr("book"), c = t.attr("chapter"), l = t.attr("verse"), d = t.attr("tag"), g = o.find("bookname").children('row[id="0"]'.replace("0", n)).text(), u = t.text(), p = u.search(new RegExp(a.q, "i")), f = t.parent().attr("id");
                                if (p >= 0) {
                                    i++;
                                    if (s != f) {
                                        $("<li>").append($("<h2>").append(o.find("index").children('section[id="0"]'.replace("0", f)).text())).appendTo(r).promise().done(function() {
                                            s = f;
                                        });
                                    }
                                    var m = eba.task.hasBookmark(f, n, c, l);
                                    var h = m ? eba.setting.classname.active : eba.setting.classname.inactive;
                                    $("<li>").addClass(h).append($("<h3>").append($("<i>", {
                                        class: "icon-bookmark"
                                    }).bind(e, function(e) {
                                        eba.task.bookmark($(this).parents("li"), f, n, c, l);
                                    }), "0 1:2".replace(0, g).replace(1, c).replace(2, l)), $("<p>").html(eba.task.textReplace(u, a.q))).appendTo(r);
                                }
                            }).promise().done(function() {
                                if (i) {
                                    t[a.q] = i;
                                    eba.db.update("suggestion");
                                } else {
                                    $("div.container").html($("<div>", {
                                        class: "msg error"
                                    }).html('"0" did not match any verses!'.replace(0, a.q)));
                                }
                            });
                        });
                    } else if (!a.q) {
                        $("div.container").html($("<div>", {
                            class: "msg error"
                        }).html("Try a word or two!"));
                    } else {
                        $("div.container").html($("<div>", {
                            class: "msg error"
                        }).html("Language has not been selected!"));
                    }
                    n();
                    var o = new Date();
                    console.log(o);
                };
                var n = function() {
                    var e = eba.db.name.suggestion;
                    $.each(e, function(e, a) {
                        console.log(e, a);
                    });
                };
                t();
                $("form").submit(function(e) {
                    a.q = $(this).children("input").val();
                    eba.db.update("query");
                    t();
                });
            },
            bookmark: function() {
                var a = eba.db.name.query;
                var t = eba.db.name.bookmark;
                if (a.language && !$.isEmptyObject(t)) {
                    var n = $(eba.xml.data[a.language]);
                    var i = $("<ul>", {
                        class: "content bookmark"
                    }).appendTo($("div.container").empty());
                    $.each(t, function(a, t) {
                        $("<li>").append($("<h2>").append(n.find("index").children('section[id="0"]'.replace("0", a)).text())).appendTo(i);
                        var s = n.find("book").find('category[id="0"]'.replace(0, a));
                        $.each(t, function(t, o) {
                            $.each(o, function(o, r) {
                                $.each(r, function(r, c) {
                                    var l = s.find('verse[book="711"][chapter="712"][verse="713"]'.replace(711, t).replace(712, o).replace(713, c));
                                    var d = n.find("bookname").children('row[id="0"]'.replace("0", t)).text();
                                    $("<li>", {
                                        class: eba.setting.classname.active
                                    }).append($("<h3>").append($("<i>", {
                                        class: "icon-bookmark"
                                    }).bind(e, function(e) {
                                        eba.task.bookmark($(this).parents("li"), a, t, o, c);
                                    }), "0 1:2".replace(0, d).replace(1, o).replace(2, c)), $("<p>").append(l.text())).appendTo(i);
                                });
                            });
                        });
                    });
                } else if ($.isEmptyObject(t)) {
                    $("div.container").html($("<div>", {
                        class: "msg error"
                    }).html("No bookmark!"));
                } else {
                    $("div.container").html($("<div>", {
                        class: "msg error"
                    }).html("Language has not been selected!"));
                }
            },
            daily: function() {
                console.log("daily page");
            }
        }
    };
    eba.init().progress(function(e) {
        if ($.isNumeric(e)) {
            $("p").attr("title", e + "%");
        } else {
            $("p").html(e);
        }
    }).done(function(e) {
        $("body").append($("<header>")).append(eba.layout.main.create()).promise().done(function() {
            $(".screen").fadeOut(500).promise().done(eba.watch.go());
        });
    }).fail(function(e) {
        $("p").html(e).addClass("blink");
    }).always(function(e) {
        $("p").html(e);
    });
});