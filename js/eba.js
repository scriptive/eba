var configPanel = {
    main: "#lCm",
    mainActive: ".lmSB",
    menu: "#lMn"
}, configMain = {
    idUnique: "eba:unique"
}, configuration = {
    description: "This is not the entire bible. This is the bible analysis according to topics. Thus it helps to search, check and study the scriptures. Please be advised, read the bible book to meditate.",
    information: {
        email: "supereffortless@gmail.com",
        introduction: "Please give proper title/subject for your email.",
        list: [ {
            name: "Advice",
            desc: "xxxxxxx"
        }, {
            name: "Broken Report",
            desc: "xxxxxxx"
        }, {
            name: "Copyrights",
            desc: "xxxxxxx"
        }, {
            name: "Discussion",
            desc: "xxxxxxx"
        }, {
            name: "Donation",
            desc: "xxxxxxx"
        }, {
            name: "Mistaken Verse",
            desc: "xxxxxxx"
        }, {
            name: "Question",
            desc: "xxxxxxx"
        } ],
        conclusion: "You will be replied as soon as possible."
    },
    page: {
        home: {
            id: 1,
            name: "Home",
            class: "icon-language",
            title: "Effortless"
        },
        category: {
            id: 2,
            name: "Category",
            class: "book"
        },
        reader: {
            id: 3,
            name: "Reader",
            class: "chapter"
        },
        search: {
            id: 4,
            name: "Search",
            class: "icon-lookup",
            title: "Search"
        },
        result: {
            id: 5,
            title: "Effortless"
        },
        bookmark: {
            id: 6,
            name: "Stars",
            class: "icon-star",
            title: "Stars"
        },
        random: {
            id: 7,
            name: "Random Verse",
            class: "icon-random",
            title: "Random Verse"
        },
        setting: {
            id: 8,
            class: "icon-display",
            title: "Display"
        },
        about: {
            id: 9,
            name: "About",
            class: "icon-about",
            title: "About"
        },
        contact: {
            id: 10,
            name: "Contact",
            class: "icon-contact",
            title: "Contact"
        }
    },
    hash: {},
    file: {
        template: "z.html",
        book: "https://storage.googleapis.com/effortless/book.json",
        urlLocal: "eba/bId.xml",
        urlAPI: [ "https://storage.googleapis.com/effortless/bId.xml" ]
    },
    fileStorage: {
        RequestQuota: 1073741824,
        Permission: 1,
        objectStore: {
            name: "eba",
            version: 1
        }
    },
    lang: {
        isLocalRemove: 'Would you like to remove "{is}" from local?',
        tryAWord: "Try a word or two!",
        noMatchFor: "No match for {for}!",
        noCategoryContent: "This category has no content...",
        noCategoryData: "This category has no data...",
        noBookmark: "None",
        noLanguage: "...",
        isNotFound: 'Not found: "{is}"',
        Loading: "Loading",
        isError: "Error",
        addLang: "Add",
        addingLang: "Adding",
        removeLang: "Remove",
        removingLang: "Removing"
    },
    classname: {
        active: "active",
        inactive: "inactive",
        filter: "filter",
        available: "available"
    },
    version: "1.0.1",
    build: "1.0.1"
};

scriptive(configMain).ready(function(app, $) {
    var file, doc = document, local = app.storage;
    app.on("error", function(e) {
        console.log("error", e);
    });
    app.extension({
        notification: function(e) {
            console.log("notification", e);
        },
        initiate: function() {
            configuration.pageHome = Object.keys(configuration.page)[0];
            var process = function() {
                local.select("setting").select("book").select("query").select("language").select("randomverse").select("todo").select("bookmark").select("suggestion");
                if (local.name.setting.hasOwnProperty("build")) {
                    if (local.name.setting.build == configuration.build) {
                        configuration.requireUpdate = 0;
                    } else {
                        configuration.requireUpdate = 2;
                    }
                } else {
                    configuration.requireUpdate = 1;
                }
                if (configuration.requireUpdate) {
                    local.name.setting.version = configuration.version;
                    local.name.setting.build = configuration.build;
                    local.update("setting");
                }
                return new Promise(function(resolve, reject) {
                    file = fileStorage(configuration.fileStorage, {
                        success: function() {
                            if (app.isEmpty(local.name.book)) {
                                app.book.json().then(function() {
                                    resolve();
                                }, function(e) {
                                    reject(e);
                                });
                            } else {
                                resolve();
                            }
                        },
                        fail: function(e) {
                            reject(e);
                        }
                    });
                });
            };
            var template = function(e) {
                return file.download({
                    url: configuration.file.template.replace(/z/, [ "default", "all" ].join(".")),
                    before: function(e) {
                        e.overrideMimeType("text/html; charset=utf-8");
                        e.responseType = "document";
                    }
                }).then(function(html) {
                    try {
                        var bOD = html.data.body;
                        while (bOD.firstChild) doc.body.appendChild(bOD.firstChild);
                        return terminal().then(function(e) {
                            var splashScreen = doc.querySelector("div#screen");
                            if (e) {
                                return e;
                            } else if (splashScreen) {
                                splashScreen.remove();
                            }
                        });
                    } catch (e) {
                        return e;
                    }
                }, function(e) {
                    return e;
                });
            };
            var terminal = function() {
                return route().then(function() {
                    local.update("query");
                    return new Promise(function(resolve, reject) {
                        app.page[local.name.query.page](resolve, reject);
                    }).then(function() {
                        doc.body.setAttribute("id", local.name.query.page);
                        app.header.content();
                    }, function(e) {
                        return e;
                    });
                }, function(e) {
                    return e;
                });
            };
            var route = function() {
                var availableLanguage = Object.keys(local.name.setting.available), fO = {
                    page: configuration.pageHome,
                    language: availableLanguage[0],
                    testament: 1,
                    category: 1,
                    q: "",
                    pagePrevious: configuration.pageHome,
                    result: ""
                }, fM = {
                    page: function(i, n, d, o) {
                        o[i] = configuration.page.hasOwnProperty(n.toLowerCase()) ? n.toLowerCase() : d;
                    },
                    pagePrevious: function(i, n, d, o) {
                        if (o[i] && configuration.page.hasOwnProperty(o[i])) {
                            if (d != o.page) {
                                o[i] = configuration.page[d].id <= configuration.page[o.page].id ? d : configuration.pageHome;
                            }
                        } else {
                            o[i] = d;
                        }
                        configuration[i] = o[i];
                    },
                    language: function(i, n, d, o) {
                        if (availableLanguage.length) {
                            if (!$(availableLanguage).inArray(n)) configuration[i] = o[d];
                            if (local.name.query.hasOwnProperty("pageBlock")) delete local.name.query.pageBlock;
                        } else {
                            local.name.query.page = configuration.pageHome;
                            local.name.query.pageBlock = 1;
                        }
                    },
                    q: function(i, n, d, o) {
                        o[i] = decodeURIComponent(n);
                    }
                };
                return new Promise(function(resolve, reject) {
                    try {
                        if ($(local.name.query).isEmpty()) {
                            $(local.name.query).merge(fO, configuration.hash);
                        } else {
                            fO.pagePrevious = local.name.query.page;
                            $(local.name.query).merge(configuration.hash);
                        }
                        $(local.name.query).each(function(i, v, o) {
                            if (fM[i] instanceof Function) fM[i](i, v, fO[i], o);
                        });
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                });
            };
            new Promise(function(resolve, reject) {
                process().then(function() {
                    doc.body.classList.add("config_Screen");
                    if (local.name.setting.hasOwnProperty("class")) {
                        $(local.name.setting.class).each(function(i, v) {
                            doc.body.classList.add(v);
                        });
                    } else {
                        local.name.setting.class = {};
                    }
                    if (local.name.setting.hasOwnProperty("available")) {} else {
                        local.name.setting.available = {};
                    }
                    return template();
                }, function(e) {
                    return e;
                }).then(function(e) {
                    if (e) {
                        reject(e);
                    } else {
                        resolve();
                    }
                });
            }).then(function() {
                $(configPanel).intPanel(function(s) {
                    var lmSB = document.getElementById("lCm").getElementsByClassName("lmSB")[0];
                    s.open(function(o) {
                        var ul = o.panel.querySelector("ul");
                        $(ul).removeChild();
                        $(configuration.page).each(function(i, v) {
                            if (v.name) {
                                $(ul).appendChild("li").addClass(i).toggleClass("active", local.name.query.page == i).appendChild("a").attr("href", "#" + i).setContent(v.name);
                            }
                        });
                        if (o.overlay === true) {
                            lmSB.style.opacity = .2;
                        }
                    });
                    s.close(function() {
                        lmSB.style.opacity = 1;
                    });
                    s.drag(function(o) {
                        if (o.overlay === true) {
                            lmSB.style.opacity = parseFloat(1 - o.percentage / 170).toFixed(2);
                        }
                    });
                });
                app.resizeEvent(function() {});
                app.hashChange(function(e) {
                    if (e) configuration.hash = e;
                    terminal().then(function(e) {
                        if (e) console.log("page error", e);
                    });
                });
                var searchForm = document.querySelector("form.search");
                if (searchForm) {}
            }, function(e) {
                if (typeof e === "object" && e.hasOwnProperty("message")) {
                    app.notification(e.message);
                } else if (typeof e === "string") {
                    app.notification(e);
                }
            });
        },
        Data: function(bId) {
            var dataSession = app.book, localId = "book", localSession = local.name, self = this;
            this.open = function() {
                return file.open({
                    urlLocal: configuration.file.urlLocal.replace(/bId/, bId),
                    readAs: "readAsText"
                });
            };
            this.download = function(progressCallback) {
                var xmlRequest = {
                    dir: JSON.parse(JSON.stringify(configuration.file.urlAPI)),
                    request: function(url) {
                        return file.download({
                            url: url,
                            urlLocal: configuration.file.urlLocal.replace(/bId/, bId),
                            before: function(xhr) {
                                xhr.overrideMimeType("text/xml; charset=utf-8");
                            },
                            progress: progressCallback
                        });
                    },
                    process: function(successCallback, failCallback) {
                        var url = xmlRequest.dir.shift().replace(/bId/, bId);
                        return xmlRequest.request(url).then(function(e) {
                            if (!e.xml) e.xml = new DOMParser().parseFromString(e.data, e.fileType);
                            dataSession.file[bId] = e.xml;
                            successCallback(e);
                        }, function(e) {
                            if (xmlRequest.dir.length) {
                                xmlRequest.process(successCallback, failCallback);
                            } else {
                                failCallback(e);
                            }
                        });
                    }
                };
                return new Promise(xmlRequest.process);
            };
            this.save = function(e) {
                return new Promise(function(resolve, reject) {
                    file.save(e).then(function(s) {
                        if (dataSession.hasOwnProperty(localId) && dataSession[localId].hasOwnProperty(bId)) localSession[localId][bId] = dataSession[localId][bId];
                        var size = s.total;
                        new app.Content(bId).xml().then(function(e) {
                            e.information().then(function(e) {
                                e.information.size = self.bytesToSize(size);
                                if (dataSession.hasOwnProperty(localId) && dataSession[localId].hasOwnProperty(bId)) {
                                    localSession[localId][bId]["information"] = e.information;
                                } else {
                                    localSession[localId][bId] = {
                                        name: e.information.name,
                                        updated: "0",
                                        information: e.information
                                    };
                                }
                                local.name.setting.available[bId] = 1;
                            }, function(e) {
                                console.log(e);
                            });
                        }, function(e) {}).then(function() {
                            local.update(localId).update("setting");
                            resolve(s);
                        });
                    }, function(e) {
                        reject(e);
                    });
                });
            };
            this.bytesToSize = function(bytes, decimals) {
                if (bytes == 0) return "0 Bytes";
                var k = 1e3, dm = decimals || 2, sizes = [ "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
            };
            this.delete = function() {
                return new Promise(function(resolve, reject) {
                    file.delete({
                        urlLocal: configuration.file.urlLocal.replace(/bId/, bId),
                        fileNotFound: true
                    }).then(function(e) {
                        delete localSession[localId][bId].information;
                        delete local.name.setting.available[bId];
                        local.update(localId).update("setting");
                        resolve(e);
                    }, function(e) {
                        reject(e);
                    });
                });
            };
            this.request = function(progressCallback) {
                return new Promise(function(resolve, reject) {
                    if (dataSession.file.hasOwnProperty(bId)) {
                        resolve(dataSession.file[bId]);
                    } else if (localSession[localId].hasOwnProperty(bId)) {
                        self.open().then(function(e) {
                            e.xml = new DOMParser().parseFromString(e.fileContent, e.fileType);
                            dataSession.file[bId] = e.xml;
                            resolve(e.xml);
                        }, function(e) {
                            self.delete().then(function() {
                                reject(e);
                            });
                        });
                    } else {
                        self.download(progressCallback).then(function(e) {
                            self.save(e).then(function() {
                                console.log("save success");
                            }, function() {
                                console.log("save fail");
                            }).then(function() {
                                resolve(e.xml);
                            });
                        }, function(e) {
                            reject(e);
                        });
                    }
                });
            };
        },
        Content: function(bId) {
            var xmlDoc, result = {
                category: 0,
                section: 0,
                verse: 0
            };
            configuration.category = {};
            var selectorCommon = function(container, callbackVerse, category) {
                return new Promise(function(resolve, reject) {
                    var xmlCategories = selectorCategory(category);
                    if (!xmlCategories.length) return reject(configuration.lang.noCategoryData);
                    $(xmlCategories).each(function(i, xmlCategory) {
                        var ol, categoryId = category ? category : xmlCategory.getAttribute("id");
                        $(xmlCategory.querySelectorAll(selectorVerse())).each(function(i, v) {
                            var verseText = callbackVerse(v);
                            if (verseText) {
                                if (!ol) ol = html.createOl(container, categoryId);
                                result.verse++;
                                var bookId = v.getAttribute("book"), testamentId = bookId <= 39 ? 1 : 2, chapterId = v.getAttribute("chapter"), verseId = v.getAttribute("verse"), tagId = v.getAttribute("tag"), testament = selectorTestamentname(testamentId), testamentName = testament.innerHTML, bookName = selectorBookname(bookId).innerHTML, bookmarkClass = app.book.hasBookmark(categoryId, bookId, chapterId, verseId) ? configuration.classname.active : configuration.classname.inactive, testamentClass = bookId <= 39 ? "OT" : "NT", bookClass = bookName.replace(/\s+/g, "-").toLowerCase();
                                var li = app.createElement("li");
                                $(ol).appendChild(li).addClass(bookmarkClass).addClass(testamentClass).addClass(bookClass);
                                $(li).appendChild("div").addClass("icon-star").click(function(evt) {
                                    app.book.addBookmark(evt.target.parentNode, categoryId, bookId, chapterId, verseId);
                                });
                                $(li).appendChild("div").attr("data-title", "123 234:345".replace(123, bookName).replace(234, chapterId).replace(345, verseId)).setContent(html.replaceNumber(verseText));
                            }
                        });
                    });
                    if (result.verse) {
                        resolve(result);
                    } else if (category) {
                        reject(configuration.lang.noCategoryContent);
                    } else {
                        reject(configuration.lang.noMatchFor);
                    }
                });
            };
            var selectorInformation = function(i) {
                if (i) {
                    return xmlDoc.querySelector('info row[id="0"]'.replace(0, i));
                } else {
                    return xmlDoc.querySelectorAll("info row");
                }
            };
            var selectorSection = function(i) {
                if (i) {
                    return xmlDoc.querySelector('section row[id="0"]'.replace(0, i));
                } else {
                    return xmlDoc.querySelectorAll("section row");
                }
            };
            var selectorCategory = function(i) {
                return xmlDoc.querySelectorAll(i ? 'category[id="0"]'.replace(0, i) : "category");
            };
            var selectorCategoryVerse = function(i) {
                return xmlDoc.querySelectorAll('category[id="0"] row'.replace(0, i));
            };
            var selectorBookname = function(i) {
                if (i) {
                    return xmlDoc.querySelector('book row[id="0"]'.replace(0, i));
                } else {
                    return xmlDoc.querySelectorAll("book row");
                }
            };
            var selectorTestamentname = function(i) {
                if (i) {
                    return xmlDoc.querySelector('testament row[id="0"]'.replace(0, i));
                } else {
                    return xmlDoc.querySelectorAll("testament row");
                }
            };
            var selectorTagname = function(i) {
                return xmlDoc.querySelector('tag row[id="0"]'.replace(0, i));
            };
            var selectorTagrow = function() {
                return xmlDoc.querySelectorAll("tag row");
            };
            var selectorVerse = function(book, chapter, verse, testament, tag) {
                var regVerse = "row";
                if (book) regVerse = regVerse + '[book="0"]'.replace(0, book);
                if (chapter) regVerse = regVerse + '[chapter="0"]'.replace(0, chapter);
                if (verse) regVerse = regVerse + '[verse="0"]'.replace(0, verse);
                if (testament) regVerse = regVerse + '[testament="0"]'.replace(0, testament);
                if (tag) regVerse = regVerse + '[tag="0"]'.replace(0, tag);
                return regVerse;
            };
            var html = {
                replaceKeyword: function(s, n) {
                    return typeof n === "string" ? s.replace(new RegExp(n, "gi"), "<b>$&</b>") : s;
                },
                replaceNumber: function(s) {
                    if (s.match(/\[(.*?)\]/g).length > 1) {
                        return s.replace(/\[(.*?)\]/g, "<sup>$1</sup>");
                    } else {
                        return s.replace(/\[(.*?)\]/g, "");
                    }
                    return s.replace(/\[(.*?)\]/g, "<sup>$1</sup>");
                },
                createOl: function(container, categoryId) {
                    result.category++;
                    var xmlSection = selectorSection(categoryId);
                    var li = app.createElement("li");
                    $(li).appendChild("h2").attr("data-description", xmlSection.innerHTML).setContent(xmlSection.getAttribute("name"));
                    app.book.category.name = xmlSection.getAttribute("name");
                    return $(container).appendChild(li).appendChild("ol").element;
                }
            };
            var responseXML = {
                section: function(container) {
                    return new Promise(function(resolve, reject) {
                        var alphabet = [];
                        $(selectorSection()).each(function(i, v) {
                            result.section++;
                            var id = v.getAttribute("id"), name = v.getAttribute("name"), sort = v.getAttribute("sort"), description = v.innerHTML, char = name.charAt(0);
                            if (alphabet.indexOf(char) < 0) {
                                alphabet.push(char);
                                $(container).appendChild("li").addClass("alpha").attr("id", char).setContent(char);
                            }
                            $(container).appendChild("li").addClass("icon-arrow-right").attr("data-title", id).appendChild("a").attr("data-total", selectorCategoryVerse(id).length).attr("data-description", v.innerHTML).attr("href", "#reader?category=" + id).setContent(name);
                        });
                        resolve(result);
                    });
                },
                randomverse: function() {
                    return new Promise(function(resolve, reject) {
                        result.information = {};
                        var categoryId = Math.floor(Math.random() * selectorSection().length);
                        var Verses = selectorCategoryVerse(categoryId);
                        var position = Math.floor(Math.random() * Verses.length);
                        var v = Verses[position];
                        var bookId = v.getAttribute("book"), testamentId = bookId <= 39 ? 1 : 2, chapterId = v.getAttribute("chapter"), verseId = v.getAttribute("verse");
                        result.information[categoryId] = {};
                        result.information[categoryId][bookId] = {};
                        result.information[categoryId][bookId][chapterId] = [ verseId ];
                        resolve(result);
                    });
                },
                information: function() {
                    return new Promise(function(resolve, reject) {
                        result.information = {};
                        $(selectorInformation()).each(function(i, v) {
                            result.section++;
                            var id = v.getAttribute("id");
                            result.information[id] = v.innerHTML;
                        });
                        resolve(result);
                    });
                },
                reader: function(container, category) {
                    return selectorCommon(container, function(v) {
                        return v.innerHTML;
                    }, category);
                },
                lookup: function(container, paraSearch) {
                    return selectorCommon(container, function(v) {
                        var testamentId = v.getAttribute("testament");
                        if (new RegExp(paraSearch, "i").test(v.innerHTML)) {
                            var testamentId = v.getAttribute("testament");
                            if (testamentId) {
                                if (testamentId == local.name.testament) {
                                    return html.replaceKeyword(v.innerHTML, paraSearch);
                                }
                            } else {
                                return html.replaceKeyword(v.innerHTML, paraSearch);
                            }
                        }
                    });
                },
                bookmark: function(container, lst) {
                    return new Promise(function(resolve, reject) {
                        $(lst).each(function(categoryId, c) {
                            var ol;
                            $(c).each(function(bookId, c) {
                                $(c).each(function(chapterId, c) {
                                    $(c).each(function(i, verseId) {
                                        $(selectorCategory(categoryId)).each(function(i, xmlCategory) {
                                            $(xmlCategory.querySelectorAll(selectorVerse(bookId, chapterId, verseId))).each(function(i, v) {
                                                if (!ol) ol = html.createOl(container, categoryId);
                                                result.verse++;
                                                var testamentId = bookId <= 39 ? 1 : 2, testamentName = selectorTestamentname(testamentId).innerHTML, bookName = selectorBookname(bookId).innerHTML, testamentClass = testamentName.replace(" ", "-").toLowerCase(), bookClass = bookName.replace(" ", "-").toLowerCase(), bookmarkClass = app.book.hasBookmark(categoryId, bookId, chapterId, verseId) ? configuration.classname.active : configuration.classname.inactive;
                                                var li = app.createElement("li");
                                                $(ol).appendChild(li).addClass(bookmarkClass).addClass(testamentClass).addClass(bookClass);
                                                $(li).appendChild("div").addClass("icon-star").click(function(evt) {
                                                    var e = evt.target.parentNode;
                                                    app.book.addBookmark(e, categoryId, bookId, chapterId, verseId);
                                                    if (local.name.query.page != "randomverse") {
                                                        e = e.remove();
                                                        if (e && e.innerHTML === "") {
                                                            e = e.parentNode.remove();
                                                            if (e && e.innerHTML === "") {
                                                                $(e).addClass("msg").appendChild("li").appendChild("div").setContent(configuration.lang.noBookmark);
                                                            }
                                                        }
                                                    }
                                                });
                                                $(li).appendChild("div").attr("data-title", "123 234:345".replace(123, bookName).replace(234, chapterId).replace(345, verseId)).setContent(html.replaceNumber(v.innerHTML));
                                            });
                                        });
                                    });
                                });
                            });
                        });
                        if (result.verse) {
                            resolve(result);
                        } else {
                            reject(configuration.lang.noBookmark);
                        }
                    });
                }
            };
            this.xml = function() {
                return new Promise(function(resolve, reject) {
                    new app.Data(bId).request(function() {}).then(function(e) {
                        xmlDoc = e;
                        resolve(responseXML);
                    }, function(e) {
                        reject(e);
                    });
                });
            };
        },
        book: {
            file: {},
            category: {},
            addBookmark: function(container, category, book, chapter, verse) {
                var bookmarks = local.name.bookmark;
                if (container.classList.contains(configuration.classname.active)) {
                    bookmarks[category][book][chapter].splice(bookmarks[category][book][chapter].indexOf(verse), 1);
                    if (bookmarks[category][book][chapter].length <= 0) {
                        delete bookmarks[category][book][chapter];
                        if (Object.keys(bookmarks[category][book]).length === 0) {
                            delete bookmarks[category][book];
                            if (Object.keys(bookmarks[category]).length === 0) {
                                delete bookmarks[category];
                            }
                        }
                    }
                    container.classList.remove(configuration.classname.active);
                    container.classList.add(configuration.classname.inactive);
                } else {
                    if (!bookmarks.hasOwnProperty(category)) bookmarks[category] = {};
                    if (!bookmarks[category].hasOwnProperty(book)) bookmarks[category][book] = {};
                    if (!bookmarks[category][book].hasOwnProperty(chapter)) bookmarks[category][book][chapter] = [];
                    bookmarks[category][book][chapter].push(verse.toString());
                    container.classList.add(configuration.classname.active);
                    container.classList.remove(configuration.classname.inactive);
                }
                local.update("bookmark");
            },
            hasBookmark: function(category, book, chapter, verse) {
                var bookmarks = local.name.bookmark;
                if (bookmarks.hasOwnProperty(category)) {
                    if (bookmarks[category].hasOwnProperty(book)) {
                        if (bookmarks[category][book].hasOwnProperty(chapter)) {
                            return bookmarks[category][book][chapter].indexOf(verse) > -1;
                        }
                    }
                }
            },
            isAvailable: function(i) {
                if (!$(local.name.book).isEmpty() && local.name.book.hasOwnProperty(i) && local.name.book[i].hasOwnProperty("information")) {
                    return true;
                }
            },
            json: function(url) {
                return new Promise(function(resolve, reject) {
                    url = url ? url : configuration.file.book;
                    file.download({
                        url: url
                    }).then(function(e) {
                        app.book.all = $(local.name.book).merge(JSON.parse(e.data));
                        local.update("book");
                        resolve();
                    }, function(e) {
                        reject(e);
                    });
                });
            }
        },
        page: {
            home: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                $(container).removeChild();
                var ul = doc.createElement("ul");
                ul.setAttribute("class", "home");
                if (local.name.query.hasOwnProperty("pageBlock")) $(container).appendChild("ul").addClass("msg notify").appendChild("li").appendChild("p").setContent(configuration.lang.noLanguage);
                container.appendChild(ul);
                $(local.name.book).each(function(bId, v) {
                    var li = doc.createElement("li"), wrap = doc.createElement("div"), name = doc.createElement("div"), link = doc.createElement("a"), action = doc.createElement("div");
                    li.setAttribute("id", bId);
                    wrap.appendChild(name);
                    wrap.appendChild(action);
                    name.appendChild(link);
                    var random = new Date().getTime();
                    $(link).attr("href", "#category?language=bId&i=random".replace(/bId/, bId).replace(/random/, random)).setContent(v.name);
                    $(action).click(function(evt) {
                        var e = evt.target;
                        if (app.book.isAvailable(bId)) {
                            action.innerHTML = configuration.lang.removingLang;
                            new app.Data(bId).delete().then(function() {
                                action.innerHTML = configuration.lang.addLang;
                            }, function(e) {
                                action.innerHTML = configuration.lang.isError;
                            });
                        } else {
                            new app.Data(bId).download(function() {
                                action.innerHTML = configuration.lang.addingLang;
                            }).then(function(e) {
                                return new app.Data(bId).save(e).then(function() {
                                    action.innerHTML = configuration.lang.removeLang;
                                }, function() {
                                    action.innerHTML = configuration.lang.isError + ":01";
                                });
                            }, function(e) {
                                action.innerHTML = configuration.lang.isError + ":02";
                            });
                        }
                    }).setContent(configuration.lang.addLang);
                    if (app.book.isAvailable(bId)) {
                        li.setAttribute("class", configuration.classname.active);
                        action.innerHTML = configuration.lang.removeLang;
                    }
                    li.appendChild(wrap);
                    ul.appendChild(li);
                });
                resolve();
            },
            category: function(resolve, reject) {
                var query = local.name.query, pID = query.page, lID = query.language;
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                var ulMain = $(container).removeChild().appendChild("ul").attr("class", "category");
                configuration.page[pID].title = local.name.book[lID].name;
                new app.Content(lID).xml().then(function(e) {
                    e.section(ulMain.element).then(function(e) {}, function(e) {});
                }, function(e) {
                    ulMain.attr("class", "msg error").appendChild("li").appendChild("div").setContent(configuration.lang.isNotFound.replace("{is}", local.name.query.language));
                }).then(function() {
                    resolve();
                    var liIndex = app.createElement("li");
                    $(container).appendChild("ul").attr("class", "category-index").appendChild(liIndex).click(function(evt) {
                        var e = evt.target, id = e.getAttribute("class"), position = doc.getElementById(id);
                        if (position) {
                            container.scrollTop = position.offsetTop;
                        }
                    });
                    ulMain.selectChild("li.alpha", true).each(function(i, v) {
                        $(liIndex).appendChild("p").attr("class", v.getAttribute("id")).setContent(v.innerHTML);
                    });
                });
            },
            reader: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                var ulMain = $(container).removeChild().appendChild("ul").attr("class", "reader");
                var query = local.name.query, pID = query.page, lID = query.language;
                new app.Content(lID).xml().then(function(e) {
                    e.reader(ulMain.element, query.category).then(function(e) {}, function(e) {});
                }, function(e) {}).then(function() {
                    configuration.page[pID].title = app.book.category.name;
                    resolve();
                });
            },
            search: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0], ul = app.createElement("ul");
                $(container).removeChild().appendChild(ul).addClass("search");
                $(ul).appendChild("li").appendChild("div").appendChild("input").attr("type", "search").attr("name", "q").attr("id", "q").attr("placeholder", "search...");
                $(ul).appendChild("li").appendChild("div").click(function(evt) {
                    var e = evt.target;
                    if (e.nextElementSibling) {
                        e.nextElementSibling.remove();
                    } else {
                        var olLanguage = app.createElement("ol");
                        $(e.parentNode).appendChild(olLanguage).click(function(evt) {
                            var e = evt.target, id = e.getAttribute("id");
                            if (id && local.name.query.language != id) {
                                e.parentNode.querySelector("." + configuration.classname.active).classList.remove(configuration.classname.active);
                                $(e).addClass(configuration.classname.active);
                                local.name.query.language = id;
                            }
                        });
                        $(local.name.book).each(function(i, v) {
                            $(olLanguage).appendChild("li").attr("id", i).addClass(local.name.query.language == i ? configuration.classname.active : configuration.classname.inactive).setContent(v.name);
                        });
                    }
                }).setContent("Language");
                var divTestament = app.createElement("div");
                $(ul).appendChild("li").addClass("lsi").appendChild(divTestament).click(function(evt) {
                    var e = evt.target, id = e.getAttribute("id");
                    if (id && local.name.query.testament != id) {
                        var elmContainer = e.parentNode.querySelector("." + configuration.classname.active);
                        if (elmContainer) {
                            elmContainer.classList.remove(configuration.classname.active);
                        }
                        $(e).addClass(configuration.classname.active);
                        local.name.query.testament = id;
                    }
                });
                $(divTestament).appendChild("p").attr("id", "1").addClass(local.name.query.testament == 1 ? configuration.classname.active : configuration.classname.inactive).setContent("OT");
                $(divTestament).appendChild("p").attr("id", "2").addClass(local.name.query.testament == 2 ? configuration.classname.active : configuration.classname.inactive).setContent("NT");
                $(ul).appendChild("li").appendChild("div").click(function() {
                    var q = doc.getElementById("q").value;
                    if (q && local.name.query.language && local.name.query.testament) {
                        window.location.hash = "#result?q=123&i=234".replace(/123/, q).replace(/234/, new Date().getTime());
                    }
                }).setContent("Enter");
                resolve();
            },
            result: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                var ul = app.createElement("ul");
                var query = local.name.query, pID = query.page, lID = query.language;
                $(container).removeChild().appendChild(ul).attr("class", "reader");
                new app.Content(lID).xml().then(function(e) {
                    if (local.name.query.q) {
                        e.lookup(ul, local.name.query.q).then(function(e) {}, function(e) {
                            $(ul).attr("class", "msg error").appendChild("li").appendChild("div").setContent(e.replace("{for}", local.name.query.q));
                        });
                    } else {
                        $(ul).attr("class", "msg error").appendChild("li").appendChild("div").setContent(configuration.lang.tryAWord);
                    }
                }, function(e) {
                    $(ul).attr("class", "msg error").appendChild("li").appendChild("div").setContent(configuration.lang.isNotFound.replace("{is}", local.name.query.book));
                }).then(function() {
                    resolve();
                });
            },
            bookmark: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                var ul = app.createElement("ul");
                $(container).removeChild().appendChild(ul).attr("class", "reader");
                new app.Content(local.name.query.language).xml().then(function(e) {
                    e.bookmark(ul, local.name.bookmark).then(function(e) {}, function(e) {
                        $(ul).attr("class", "msg error").appendChild("li").appendChild("div").setContent(e);
                    });
                }, function(e) {
                    $(ul).attr("class", "msg error").appendChild("li").appendChild("div").setContent(configuration.lang.isNotFound.replace("{is}", local.name.query.language));
                }).then(function() {
                    resolve();
                });
            },
            random: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                var ul = app.createElement("ul");
                $(container).removeChild().appendChild(ul).attr("class", "reader");
                var randomGet = false, randomDay = new Date().toLocaleDateString().toString().replace(/\//g, "");
                new Promise(function(res, rej) {
                    if (local.name.randomverse && $(local.name.randomverse).isObject() && !$(local.name.randomverse).isEmpty()) {
                        if (local.name.randomverse.id != randomDay) {
                            local.name.randomverse.id = randomDay;
                            randomGet = true;
                        }
                    } else {
                        randomGet = true;
                        local.name.randomverse.id = randomDay;
                    }
                    if (randomGet) {
                        new app.Content(local.name.query.language).xml().then(function(e) {
                            e.randomverse().then(function(e) {
                                local.name.randomverse.verse = e.information;
                                local.update("randomverse");
                                res();
                            });
                        });
                    } else {
                        res();
                    }
                }).then(function() {
                    new app.Content(local.name.query.language).xml().then(function(e) {
                        e.bookmark(ul, local.name.randomverse.verse).then(function(e) {}, function(e) {});
                    }, function(e) {}).then(function() {
                        resolve();
                    });
                });
            },
            setting: function(resolve, reject) {
                var localSetting = local.name.setting, sizeNcolor = {
                    fontsize: {
                        title: "Words size",
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
                                class: "size-normal",
                                defaults: true
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
                        title: "background colour",
                        style: "body {background-color:$white;}",
                        option: {
                            "#ffffff": {
                                class: "color-white"
                            },
                            "#F8F8F8": {
                                class: "color-lightgray",
                                defaults: true
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
                }, container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0], ul = app.createElement("ul");
                $(container).removeChild().appendChild(ul).addClass("setting");
                if (!localSetting.hasOwnProperty("class")) {
                    localSetting.class = {};
                }
                $(sizeNcolor).each(function(k, name) {
                    var li = app.createElement("li");
                    $(ul).appendChild(li).appendChild("h3").setContent(name.title);
                    var ol = $(ul).appendChild(li).appendChild("ol").addClass(k).element;
                    $(name.option).each(function(i, o) {
                        var activeStatusClass = configuration.classname.inactive, li = $(ol).appendChild("li").addClass(o.class).addClass("icon-ok");
                        if (o.hasOwnProperty("title")) li.attr("data-title", o.title);
                        if (localSetting.class.hasOwnProperty(k)) {
                            activeStatusClass = localSetting.class[k] == o.class ? configuration.classname.active : configuration.classname.inactive;
                        } else if (o.hasOwnProperty("defaults")) {
                            activeStatusClass = configuration.classname.active;
                        }
                        li.addClass(activeStatusClass).click(function(evt) {
                            var e = evt.target;
                            if (!e.classList.contains(configuration.classname.active)) {
                                $(e.parentNode.getElementsByClassName(configuration.classname.active)).each(function(i, eCurrent) {
                                    eCurrent.classList.remove(configuration.classname.active);
                                });
                                e.classList.add(configuration.classname.active);
                                if (localSetting.class.hasOwnProperty(k) && document.body.classList.contains(localSetting.class[k])) document.body.classList.remove(localSetting.class[k]);
                                if (!document.body.classList.contains(o.class)) document.body.classList.add(o.class);
                                localSetting.class[k] = o.class;
                                local.update("setting");
                            }
                        });
                    });
                });
                resolve();
            },
            about: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                var ul = app.createElement("ul");
                $(container).removeChild().appendChild(ul).addClass("about").appendChild("li").addClass("description").appendChild("p").addClass("desc").setContent(configuration.description);
                $(local.name.book).each(function(i, v) {
                    var li = app.createElement("li");
                    $(ul).appendChild(li);
                    $(li).addClass(configuration.classname.available).appendChild("h3").setContent(v.name);
                    if (v.hasOwnProperty("information") && !$(v.information).isEmpty()) {
                        $(li).appendChild("p").attr("data-title", "Version").setContent(v.information.version);
                        if (v.information.hasOwnProperty("size")) {
                            $(li).appendChild("p").attr("data-title", "Size").setContent(v.information.size);
                        } else {
                            $(li).appendChild("p").attr("data-title", "Size").setContent("size view required to readd language");
                        }
                    } else {
                        $(li).addClass(configuration.classname.inactive);
                    }
                });
                resolve();
            },
            contact: function(resolve, reject) {
                var container = doc.getElementById("lCm").getElementsByClassName("lmSB")[0];
                $(container).removeChild();
                var ul = app.createElement("ul");
                container.appendChild(ul).setAttribute("class", "about");
                var info = configuration.information;
                ul.appendChild(app.createElement("li")).innerHTML = info.email;
                ul.appendChild(app.createElement("li")).innerHTML = info.introduction;
                var li = app.createElement("li");
                $(ul).appendChild(li);
                $(info.list).each(function(i, v) {
                    $(li).appendChild("p").attr("data-title", v.name).setContent(v.desc);
                });
                ul.appendChild(app.createElement("li")).innerHTML = info.conclusion;
                resolve();
            }
        },
        header: {
            content: function() {
                var lMn = doc.getElementById("lMn");
                var homeElement = lMn.querySelector(".icon-panel");
                var titleElement = lMn.querySelector("#lmD");
                var backElement = lMn.querySelector("#backLink");
                titleElement.setAttribute("data-title", configuration.page[local.name.query.page].title);
                if (local.name.query.page != local.name.query.pagePrevious) {
                    if (!backElement) {
                        backElement = doc.createElement("li");
                        backElement.setAttribute("class", "icon-left");
                        backElement.setAttribute("id", "backLink");
                        lMn.insertBefore(backElement, lMn.firstChild);
                        homeElement.style.display = "none";
                        $(backElement).click(function() {
                            window.location.hash = "#123".replace(/123/, local.name.query.pagePrevious);
                        });
                    }
                } else if (backElement) {
                    backElement.remove();
                    homeElement.style.display = "";
                }
            }
        }
    }).initiate();
});