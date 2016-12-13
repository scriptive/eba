/*!
    eba -- Effortless bible analysis
    v1.0.123
    https://scriptive.github.io/eba
    (c) 2016
*/
!function(e) {
    e.merge({
        load: function() {
            this.init().progress(function(t) {
                $.isNumeric(t) ? e.notification("title", t + "%") : e.notification(t);
            }).done(function(t) {
                $("body").append($("<header>")).append(e.layout.main.create()).promise().done(function() {
                    $(".screen").fadeOut(500).promise().done(e.watch.go());
                });
            }).fail(function(t) {
                e.notification(t).setAttribute("class", "blink");
            }).always(function(t) {
                e.notification(t);
            });
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
            }
        },
        xml: {
            data: {},
            set: function(e, t) {
                Object.defineProperty(this.data, e, {
                    value: t
                });
            },
            remove: function() {},
            import: function(t, a) {
                return e.setting.language[a] = {
                    xml: a,
                    name: "(?) " + a + " temp",
                    description: "Unknown"
                }, this.load(t, a);
            },
            get: function(t, a) {
                if (t || (Object.keys(this.data)[0] ? (t = Object.keys(this.data)[0], console.log(t)) : t = Object.keys(e.setting.language)[0]), 
                this.data.hasOwnProperty(t)) {
                    var n = $.Deferred();
                    return a && a(), n.resolve(e.xml.data[t]), n.promise();
                }
                return this.load("db", t, a);
            },
            load: function(t, a, n) {
                return $.ajax({
                    type: "GET",
                    url: "url/file.xml".replace("url", t).replace("file", e.setting.language[a].xml),
                    cache: !1,
                    dataType: "xml",
                    xhr: function() {
                        var e = new window.XMLHttpRequest();
                        return n && e.addEventListener("progress", n, !1), e;
                    }
                }).done(function(t) {
                    e.xml.set(a, t);
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
                            job: function(t) {
                                t.bind(e.config.Handler, function(t) {
                                    $(this).parent().toggleClass(e.setting.classname.active);
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
            }
        },
        watch: {
            go: function(t) {
                return t && e.content.hasOwnProperty(t) || (t = e.localStorage.name.query.page, 
                e.content.hasOwnProperty(t) || (t = "menu")), e.layout.identity(t), e.content[t];
            },
            filter: function(t) {
                t.toggleClass(e.setting.classname.active);
            }
        },
        layout: {
            header: {
                change: function(t) {
                    var a = $("<ul>");
                    if (e.page[t].hasOwnProperty("header")) return $.each(e.page[t].header, function(t, n) {
                        $("<li>", n.attr).append(function() {
                            if (n.child) {
                                var e = $(n.child.tag, n.child.attr);
                                return e.html(function() {
                                    if (n.child.hasOwnProperty("job")) return n.child.job(e);
                                });
                            }
                        }).bind(e.config.Handler, function(t) {
                            var a = $(this).attr("go");
                            a && e.watch.go(a)();
                        }).appendTo(a);
                    }), a;
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
            identity: function(t) {
                $("body").attr("id", t), $("header").html(this.header.change(t)).promise().done(function() {
                    e.localStorage.name.query.page = t, e.localStorage.update("query");
                });
            }
        },
        init: function(t) {
            var a = $.Deferred();
            return a.notify("initiating"), setTimeout(function() {
                $("body").addClass(e.config.Screen).promise().then(function() {
                    a.notify("configuration"), setTimeout(function() {
                        var t = e.localStorage.select("setting");
                        t.name.setting.hasOwnProperty("class") ? $.each(t.name.setting.class, function(e, t) {
                            $("body").addClass(t);
                        }) : t.name.setting.class = {}, e.localStorage.select("bookmark").select("query").select("suggestion").select("language");
                    }, 200);
                }).then(function() {
                    setTimeout(function() {
                        a.notify("XML"), e.xml.get(null, function(e) {
                            var t = 70;
                            e.lengthComputable && (t = Math.round(e.loaded / e.total * 70)), a.notify(t);
                        }).done(function(e) {
                            a.notify("Data");
                        }).fail(function(e, t) {
                            a.notify(90), e.statusText ? a.reject(e.statusText) : a.reject(t);
                        });
                    }, 400);
                }).then(function() {
                    setTimeout(function() {
                        e.config.Screen ? a.notify(90) : a.notify(99).reject("connecting to device");
                    }, 600);
                }).then(function() {
                    setTimeout(function() {
                        a.notify(100).resolve("ready");
                    }, 800), $(document).on("submit", "form", function(e) {
                        e.preventDefault();
                    });
                });
            }, 100), a.promise();
        },
        msg: function(e) {
            return $("div.msg").length ? void $("div.msg").fadeToggle("fast", function() {
                $(this).html(e);
            }) : $("<div>", {
                class: "msg"
            }).html(e).prependTo("div.container");
        },
        task: {
            bookmark: function(t, a, n, i, o) {
                var s = e.localStorage.name.bookmark;
                t.hasClass(e.setting.classname.active) ? (s[a][n][i].splice(s[a][n][i].indexOf(o), 1), 
                s[a][n][i].length <= 0 && (delete s[a][n][i], $.isEmptyObject(s[a][n]) && (delete s[a][n], 
                $.isEmptyObject(s[a]) && delete s[a])), t.parent().hasClass("bookmark") && t.fadeOut(300)) : (s.hasOwnProperty(a) || (s[a] = {}), 
                s[a].hasOwnProperty(n) || (s[a][n] = {}), s[a][n].hasOwnProperty(i) || (s[a][n][i] = []), 
                s[a][n][i].push(o.toString())), t.toggleClass(e.setting.classname.active).promise().done(function() {
                    e.localStorage.update("bookmark");
                });
            },
            hasBookmark: function(t, a, n, i) {
                var o = e.localStorage.name.bookmark;
                if (o.hasOwnProperty(t) && o[t].hasOwnProperty(a) && o[t][a].hasOwnProperty(n)) return $.inArray(i, o[t][a][n]) >= 0;
            },
            textReplace: function(e, t) {
                return "string" === $.type(t) ? e.replace(new RegExp(t, "gi"), "<b>$&</b>") : e;
            },
            numReplace: function(e) {
                return e.replace(/\d+/g, "<sup>$&</sup>");
            }
        },
        content: {
            menu: function() {
                var t = $("<ul>", {
                    class: "menu"
                }).appendTo($("div.container").empty());
                $.each(e.page, function(a, n) {
                    n.name && $("<li>").append(n.name).bind(e.config.Handler, function(t) {
                        e.watch.go(a)();
                    }).appendTo(t);
                });
            },
            setting: function() {
                var t = {
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
                }, a = $("<ul>", {
                    class: "setting"
                }).appendTo($("div.container").empty()), n = e.localStorage.select("setting");
                n.name.setting.hasOwnProperty("class") || (n.name.setting.class = {}), $.each(t, function(t, i) {
                    $("<li>", {
                        class: "title"
                    }).append(i.title).appendTo(a), $("<li>", {
                        class: t
                    }).append(function() {
                        var a = $(this);
                        $.each(i.option, function(i, o) {
                            if (n.name.setting.class.hasOwnProperty(t)) var s = n.name.setting.class[t] == o.class ? e.setting.classname.active : e.setting.classname.inactive; else var s = e.setting.classname.inactive;
                            $("<span>", o).addClass("icon-").addClass(s).bind(e.config.Handler, function(a) {
                                $(this).addClass(e.setting.classname.active).siblings().removeClass(e.setting.classname.active), 
                                n.name.setting.class.hasOwnProperty(t) && $("body").hasClass(n.name.setting.class[t]) && $("body").removeClass(n.name.setting.class[t]), 
                                $("body").hasClass(o.class) || $("body").addClass(o.class), n.name.setting.class[t] = o.class, 
                                n.update("setting");
                            }).appendTo(a);
                        });
                    }).appendTo(a);
                });
            },
            language: function() {
                var t = e.localStorage.name.language, a = e.localStorage.name.query, n = $("<ul>", {
                    class: "language"
                }).appendTo($("div.container").empty());
                $.each(e.setting.language, function(i, o) {
                    if (t.hasOwnProperty(i)) var s = e.setting.classname.active; else var s = e.setting.classname.inactive;
                    $("<li>", {
                        class: i
                    }).addClass(s).append($("<p>", {
                        class: "lang icon-flag-empty"
                    }).append(o.name).bind(e.config.Handler, function(n) {
                        t.hasOwnProperty(i) ? (a.language = i, e.watch.go("category")(i)) : e.msg("Selected language is not activited!");
                    }), $("<p>", {
                        class: "download icon-"
                    }).append($("<span>", {
                        text: "download"
                    })).bind(e.config.Handler, function(n) {
                        $(this).parent().toggleClass(e.setting.classname.active).promise().done(function() {
                            t.hasOwnProperty(i) ? (delete t[i], Object.keys(t)[0] ? a.language = Object.keys(t)[0] : delete a.language) : (a.language = i, 
                            t[i] = {}), e.localStorage.update("query").update("language");
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
                }, t = $("<ul>", {
                    class: "about"
                }).appendTo($("div.container").empty());
                $.each(e, function(e, a) {
                    $("<li>", {
                        class: e
                    }).append(a).appendTo(t);
                });
            },
            category: function() {
                var t = e.localStorage.name.query;
                t.language ? e.xml.get(t.language).done(function(a) {
                    var n = $("<ol>", {
                        class: "category"
                    }).appendTo($("div.container").empty());
                    $(a).find("index").children("section").each(function() {
                        var a = $(this), i = a.attr("id"), o = a.attr("name");
                        $("<li>").append($("<a>", {
                            class: "icon-right-open"
                        }).append(o).bind(e.config.Handler, function(a) {
                            t.category = i, e.watch.go("verse")(i);
                        })).appendTo(n);
                    });
                }) : $("div.container").html($("<div>", {
                    class: "msg error"
                }).html("Language has not been selected!"));
            },
            verse: function() {
                var t, a = e.localStorage.name.query, n = [], i = [];
                e.xml.get(a.language).done(function(o) {
                    var s = $("<ul>", {
                        class: "content"
                    }).appendTo($("div.container").empty());
                    t = $(o), $(".title").html(t.find("index").children('section[id="0"]'.replace("0", a.category)).text()), 
                    t.find("book").find('category[id="0"]'.replace(0, a.category)).children("verse").each(function() {
                        var o = $(this), c = o.attr("book"), l = o.attr("chapter"), r = o.attr("verse"), d = o.attr("tag"), g = t.find("bookname").children('row[id="0"]'.replace("0", c)).text(), u = o.text(), p = c <= 39 ? 1 : 2;
                        n.push(d), i.push(p);
                        var f = e.task.hasBookmark(a.category, c, l, r), m = f ? e.setting.classname.active : e.setting.classname.inactive, h = t.find("tag").children('row[id="0"]'.replace("0", d)).text().toLowerCase(), v = t.find("testament").children('row[id="0"]'.replace("0", p)).text().replace(" ", "-").toLowerCase();
                        $("<li>", {
                            class: h
                        }).addClass(m).addClass(v).append($("<h3>").append($("<i>", {
                            class: "icon-bookmark"
                        }).bind(e.config.Handler, function(t) {
                            e.task.bookmark($(this).parents("li"), a.category, c, l, r);
                        }), "0 1:2".replace(0, g).replace(1, l).replace(2, r)), $("<p>").append(e.task.numReplace(u))).appendTo(s);
                    });
                }).then(function() {
                    n = $.unique(n), i = $.unique(i);
                    var a = $("<li>").appendTo($("<ul>").appendTo($("li.filter"))), o = $("<ul>").appendTo(a);
                    $.each(n, function(a, n) {
                        var i = t.find("tag").children('row[id="0"]'.replace("0", n)).text(), s = i.toLowerCase();
                        $("<li>", {
                            class: "icon-ok active"
                        }).addClass(s).html(i).bind(e.config.Handler, function(e) {
                            $("div.container ul li").each(function(e, t) {
                                $(this).hasClass(s) && $(this).fadeToggle("fast");
                            }).promise().done($(this).toggleClass("active"));
                        }).appendTo(o);
                    });
                });
            },
            search: function() {
                var t = e.localStorage.name.query, a = function() {
                    var a = e.localStorage.name.suggestion, i = 0, o = 0;
                    t.language && t.q ? e.xml.get(t.language).done(function(n) {
                        var s = $(e.xml.data[t.language]), c = $("<ul>", {
                            class: "content search"
                        }).appendTo($("div.container").empty());
                        s.find("book").find("category").children("verse").each(function() {
                            var a = $(this), n = a.attr("book"), l = a.attr("chapter"), r = a.attr("verse"), d = (a.attr("tag"), 
                            s.find("bookname").children('row[id="0"]'.replace("0", n)).text()), g = a.text(), u = g.search(new RegExp(t.q, "i")), p = a.parent().attr("id");
                            if (u >= 0) {
                                i++, o != p && $("<li>").append($("<h2>").append(s.find("index").children('section[id="0"]'.replace("0", p)).text())).appendTo(c).promise().done(function() {
                                    o = p;
                                });
                                var f = e.task.hasBookmark(p, n, l, r), m = f ? e.setting.classname.active : e.setting.classname.inactive;
                                $("<li>").addClass(m).append($("<h3>").append($("<i>", {
                                    class: "icon-bookmark"
                                }).bind(e.config.Handler, function(t) {
                                    e.task.bookmark($(this).parents("li"), p, n, l, r);
                                }), "0 1:2".replace(0, d).replace(1, l).replace(2, r)), $("<p>").html(e.task.textReplace(g, t.q))).appendTo(c);
                            }
                        }).promise().done(function() {
                            i ? (a[t.q] = i, e.localStorage.update("suggestion")) : $("div.container").html($("<div>", {
                                class: "msg error"
                            }).html('"0" did not match any verses!'.replace(0, t.q)));
                        });
                    }) : t.q ? $("div.container").html($("<div>", {
                        class: "msg error"
                    }).html("Language has not been selected!")) : $("div.container").html($("<div>", {
                        class: "msg error"
                    }).html("Try a word or two!")), n();
                    var s = new Date();
                    console.log(s);
                }, n = function() {
                    var t = e.localStorage.name.suggestion;
                    $.each(t, function(e, t) {
                        console.log(e, t);
                    });
                };
                a(), $("form").submit(function(n) {
                    t.q = $(this).children("input").val(), e.localStorage.update("query"), a();
                });
            },
            bookmark: function() {
                var t = e.localStorage.name.query, a = e.localStorage.name.bookmark;
                if (t.language && !$.isEmptyObject(a)) {
                    var n = $(e.xml.data[t.language]), i = $("<ul>", {
                        class: "content bookmark"
                    }).appendTo($("div.container").empty());
                    $.each(a, function(t, a) {
                        $("<li>").append($("<h2>").append(n.find("index").children('section[id="0"]'.replace("0", t)).text())).appendTo(i);
                        var o = n.find("book").find('category[id="0"]'.replace(0, t));
                        $.each(a, function(a, s) {
                            $.each(s, function(s, c) {
                                $.each(c, function(c, l) {
                                    var r = o.find('verse[book="711"][chapter="712"][verse="713"]'.replace(711, a).replace(712, s).replace(713, l)), d = n.find("bookname").children('row[id="0"]'.replace("0", a)).text();
                                    $("<li>", {
                                        class: e.setting.classname.active
                                    }).append($("<h3>").append($("<i>", {
                                        class: "icon-bookmark"
                                    }).bind(e.config.Handler, function(n) {
                                        e.task.bookmark($(this).parents("li"), t, a, s, l);
                                    }), "0 1:2".replace(0, d).replace(1, s).replace(2, l)), $("<p>").append(r.text())).appendTo(i);
                                });
                            });
                        });
                    });
                } else $.isEmptyObject(a) ? $("div.container").html($("<div>", {
                    class: "msg error"
                }).html("No bookmark!")) : $("div.container").html($("<div>", {
                    class: "msg error"
                }).html("Language has not been selected!"));
            },
            daily: function() {
                console.log("daily page");
            }
        }
    });
}(scriptive("eba"));