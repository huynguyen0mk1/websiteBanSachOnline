/*!
 * jQuery.filer
 * Copyright (c) 2015 CreativeDream
 * Website: https://github.com/CreativeDream/jquery.filer
 * Version: 1.0.5 (19-Nov-2015)
 * Requires: jQuery v1.7.1 or later
 */
!(function (e) {
  "use strict";
  (e.fn.filer = function (i) {
    return this.each(function (t, n) {
      var l = e(n),
        a = ".jFiler",
        r = e(),
        o = e(),
        s = e(),
        d = [],
        f = e.isFunction(i) ? i(l, e.fn.filer.defaults) : i,
        p =
          f && e.isPlainObject(f)
            ? e.extend(!0, {}, e.fn.filer.defaults, f)
            : e.fn.filer.defaults,
        u = {
          init: function () {
            l.wrap('<div class="jFiler"></div>'),
              u._set("props"),
              (l.prop("jFiler").boxEl = r = l.closest(a)),
              u._changeInput();
          },
          _bindInput: function () {
            p.changeInput && o.size() > 0 && o.bind("click", u._clickHandler),
              l.on({
                focus: function () {
                  o.addClass("focused");
                },
                blur: function () {
                  o.removeClass("focused");
                },
                change: function () {
                  u._onChange();
                },
              }),
              p.dragDrop &&
                (o.length > 0 ? o : l)
                  .bind("drop", u._dragDrop.drop)
                  .bind("dragover", u._dragDrop.dragEnter)
                  .bind("dragleave", u._dragDrop.dragLeave),
              p.uploadFile &&
                p.clipBoardPaste &&
                e(window).on("paste", u._clipboardPaste);
          },
          _unbindInput: function () {
            p.changeInput && o.size() > 0 && o.unbind("click", u._clickHandler);
          },
          _clickHandler: function () {
            l.click();
          },
          _applyAttrSettings: function () {
            var e = [
              "name",
              "limit",
              "maxSize",
              "extensions",
              "changeInput",
              "showThumbs",
              "appendTo",
              "theme",
              "addMore",
              "excludeName",
              "files",
              "uploadUrl",
              "uploadData",
              "options",
            ];
            for (var i in e) {
              var t = "data-jfiler-" + e[i];
              if (u._assets.hasAttr(t)) {
                switch (e[i]) {
                  case "changeInput":
                  case "showThumbs":
                  case "addMore":
                    p[e[i]] =
                      ["true", "false"].indexOf(l.attr(t)) > -1
                        ? "true" == l.attr(t)
                        : l.attr(t);
                    break;
                  case "extensions":
                    p[e[i]] = l.attr(t).replace(/ /g, "").split(",");
                    break;
                  case "uploadUrl":
                    p.uploadFile && (p.uploadFile.url = l.attr(t));
                    break;
                  case "uploadData":
                    p.uploadFile && (p.uploadFile.data = JSON.parse(l.attr(t)));
                    break;
                  case "files":
                  case "options":
                    p[e[i]] = JSON.parse(l.attr(t));
                    break;
                  default:
                    p[e[i]] = l.attr(t);
                }
                l.removeAttr(t);
              }
            }
          },
          _changeInput: function () {
            if (
              (u._applyAttrSettings(),
              null != p.beforeRender && "function" == typeof p.beforeRender
                ? p.beforeRender(r, l)
                : null,
              p.theme && r.addClass("jFiler-theme-" + p.theme),
              "input" != l.get(0).tagName.toLowerCase() &&
                "file" != l.get(0).type)
            )
              (o = l),
                (l = e('<input type="file" name="' + p.name + '" />')),
                l.css({
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  "z-index": "-9999",
                }),
                r.prepend(l),
                (u._isGn = l);
            else if (p.changeInput) {
              switch (typeof p.changeInput) {
                case "boolean":
                  o = e(
                    '<div class="jFiler-input"><div class="jFiler-input-caption"><span>' +
                      p.captions.feedback +
                      '</span></div><div class="jFiler-input-button">' +
                      p.captions.button +
                      '</div></div>"'
                  );
                  break;
                case "string":
                case "object":
                  o = e(p.changeInput);
                  break;
                case "function":
                  o = e(p.changeInput(r, l, p));
              }
              l.after(o),
                l.css({
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  "z-index": "-9999",
                });
            }
            (l.prop("jFiler").newInputEl = o),
              (!p.limit || (p.limit && p.limit >= 2)) &&
                (l.attr("multiple", "multiple"),
                "[]" != l.attr("name").slice(-2)
                  ? l.attr("name", l.attr("name") + "[]")
                  : null),
              u._bindInput(),
              p.files && u._append(!1, { files: p.files }),
              null != p.afterRender && "function" == typeof p.afterRender
                ? p.afterRender(s, r, o, l)
                : null;
          },
          _clear: function () {
            (u.files = null),
              (l.prop("jFiler").files = null),
              p.uploadFile || p.addMore || u._reset(),
              u._set(
                "feedback",
                u._itFl && u._itFl.length > 0
                  ? u._itFl.length + " " + p.captions.feedback2
                  : p.captions.feedback
              ),
              null != p.onEmpty && "function" == typeof p.onEmpty
                ? p.onEmpty(r, o, l)
                : null;
          },
          _reset: function (i) {
            if (!i) {
              if (!p.uploadFile && p.addMore) {
                for (var t = 0; t < d.length; t++) d[t].remove();
                (d = []),
                  u._unbindInput(),
                  (l = u._isGn ? u._isGn : e(n)),
                  u._bindInput();
              }
              u._set("input", "");
            }
            (u._itFl = []),
              (u._itFc = null),
              (u._ajFc = 0),
              u._set("props"),
              (l.prop("jFiler").files_list = u._itFl),
              (l.prop("jFiler").current_file = u._itFc),
              u._prEr ||
                ((u._itFr = []),
                r.find("input[name^='jfiler-items-exclude-']:hidden").remove()),
              s.fadeOut("fast", function () {
                e(this).remove();
              }),
              (l.prop("jFiler").listEl = s = e());
          },
          _set: function (e, i) {
            switch (e) {
              case "input":
                l.val("");
                break;
              case "feedback":
                o.length > 0 && o.find(".jFiler-input-caption span").html(i);
                break;
              case "props":
                l.prop("jFiler") ||
                  l.prop("jFiler", {
                    options: p,
                    listEl: s,
                    boxEl: r,
                    newInputEl: o,
                    inputEl: l,
                    files: u.files,
                    files_list: u._itFl,
                    current_file: u._itFc,
                    append: function (e) {
                      return u._append(!1, { files: [e] });
                    },
                    remove: function (e) {
                      return (
                        u._remove(null, { binded: !0, data: { id: e } }), !0
                      );
                    },
                    reset: function () {
                      return u._reset(), u._clear(), !0;
                    },
                    retry: function (e) {
                      return u._retryUpload(e);
                    },
                  });
            }
          },
          _filesCheck: function () {
            var i = 0;
            if (p.limit && u.files.length + u._itFl.length > p.limit)
              return (
                alert(u._assets.textParse(p.captions.errors.filesLimit)), !1
              );
            for (var t = 0; t < u.files.length; t++) {
              var n = u.files[t].name.split(".").pop().toLowerCase(),
                l = u.files[t],
                a = {
                  name: l.name,
                  size: l.size,
                  size2: u._assets.bytesToSize(l.size),
                  type: l.type,
                  ext: n,
                };
              if (null != p.extensions && -1 == e.inArray(n, p.extensions))
                return (
                  alert(u._assets.textParse(p.captions.errors.filesType, a)), !1
                );
              if (null != p.maxSize && u.files[t].size > 1048576 * p.maxSize)
                return (
                  alert(u._assets.textParse(p.captions.errors.filesSize, a)), !1
                );
              if (4096 == l.size && 0 == l.type.length) return !1;
              i += u.files[t].size;
            }
            if (null != p.maxSize && i >= Math.round(1048576 * p.maxSize))
              return (
                alert(u._assets.textParse(p.captions.errors.filesSizeAll)), !1
              );
            if (p.addMore || p.uploadFile) {
              var a = u._itFl.filter(function (e, i) {
                return e.file.name != l.name ||
                  e.file.size != l.size ||
                  e.file.type != l.type ||
                  (l.lastModified ? e.file.lastModified != l.lastModified : 0)
                  ? void 0
                  : !0;
              });
              if (a.length > 0) return !1;
            }
            return !0;
          },
          _thumbCreator: {
            create: function (i) {
              var t = u.files[i],
                n = u._itFc ? u._itFc.id : i,
                l = t.name,
                a = t.size,
                r = t.type.split("/", 1).toString().toLowerCase(),
                o =
                  -1 != l.indexOf(".") ? l.split(".").pop().toLowerCase() : "",
                d = p.uploadFile
                  ? '<div class="jFiler-jProgressBar">' +
                    p.templates.progressBar +
                    "</div>"
                  : "",
                f = {
                  id: n,
                  name: l,
                  size: a,
                  size2: u._assets.bytesToSize(a),
                  type: r,
                  extension: o,
                  icon: u._assets.getIcon(o, r),
                  icon2: u._thumbCreator.generateIcon({
                    type: r,
                    extension: o,
                  }),
                  image:
                    '<div class="jFiler-item-thumb-image fi-loading"></div>',
                  progressBar: d,
                  _appended: t._appended,
                },
                c = "";
              return (
                t.opts && (f = e.extend({}, t.opts, f)),
                (c = e(u._thumbCreator.renderContent(f)).attr(
                  "data-jfiler-index",
                  n
                )),
                (c.get(0).jfiler_id = n),
                u._thumbCreator.renderFile(t, c, f),
                t.forList
                  ? c
                  : ((u._itFc.html = c),
                    c
                      .hide()
                      [p.templates.itemAppendToEnd ? "appendTo" : "prependTo"](
                        s.find(p.templates._selectors.list)
                      )
                      .show(),
                    void (t._appended || u._onSelect(i)))
              );
            },
            renderContent: function (e) {
              return u._assets.textParse(
                e._appended ? p.templates.itemAppend : p.templates.item,
                e
              );
            },
            renderFile: function (i, t, n) {
              if (0 == t.find(".jFiler-item-thumb-image").size()) return !1;
              if (i.file && "image" == n.type) {
                var l = '<img src="' + i.file + '" draggable="false" />',
                  a = t.find(".jFiler-item-thumb-image.fi-loading");
                return (
                  e(l)
                    .error(function () {
                      (l = u._thumbCreator.generateIcon(n)),
                        t.addClass("jFiler-no-thumbnail"),
                        a.removeClass("fi-loading").html(l);
                    })
                    .load(function () {
                      a.removeClass("fi-loading").html(l);
                    }),
                  !0
                );
              }
              if (
                window.File &&
                window.FileList &&
                window.FileReader &&
                "image" == n.type &&
                n.size < 6e6
              ) {
                var r = new FileReader();
                (r.onload = function (i) {
                  var l =
                      '<img src="' + i.target.result + '" draggable="false" />',
                    a = t.find(".jFiler-item-thumb-image.fi-loading");
                  e(l)
                    .error(function () {
                      (l = u._thumbCreator.generateIcon(n)),
                        t.addClass("jFiler-no-thumbnail"),
                        a.removeClass("fi-loading").html(l);
                    })
                    .load(function () {
                      a.removeClass("fi-loading").html(l);
                    });
                }),
                  r.readAsDataURL(i);
              } else {
                var l = u._thumbCreator.generateIcon(n),
                  a = t.find(".jFiler-item-thumb-image.fi-loading");
                t.addClass("jFiler-no-thumbnail"),
                  a.removeClass("fi-loading").html(l);
              }
            },
            generateIcon: function (i) {
              var t = new Array(3);
              if (i && i.type && i.extension)
                switch (i.type) {
                  case "image":
                    (t[0] = "f-image"),
                      (t[1] = '<i class="icon-jfi-file-image"></i>');
                    break;
                  case "video":
                    (t[0] = "f-video"),
                      (t[1] = '<i class="icon-jfi-file-video"></i>');
                    break;
                  case "audio":
                    (t[0] = "f-audio"),
                      (t[1] = '<i class="icon-jfi-file-audio"></i>');
                    break;
                  default:
                    (t[0] = "f-file f-file-ext-" + i.extension),
                      (t[1] = i.extension.length > 0 ? "." + i.extension : ""),
                      (t[2] = 1);
                }
              else
                (t[0] = "f-file"),
                  (t[1] =
                    i.extension && i.extension.length > 0
                      ? "." + i.extension
                      : ""),
                  (t[2] = 1);
              var n =
                '<span class="jFiler-icon-file ' +
                t[0] +
                '">' +
                t[1] +
                "</span>";
              if (1 == t[2]) {
                var l = u._assets.text2Color(i.extension);
                if (l) {
                  var a = e(n).appendTo("body"),
                    r = a.css("box-shadow");
                  (r =
                    l +
                    r.substring(
                      r.replace(/^.*(rgba?\([^)]+\)).*$/, "$1").length,
                      r.length
                    )),
                    a
                      .css({
                        "-webkit-box-shadow": r,
                        "-moz-box-shadow": r,
                        "box-shadow": r,
                      })
                      .attr(
                        "style",
                        "-webkit-box-shadow: " +
                          r +
                          "; -moz-box-shadow: " +
                          r +
                          "; box-shadow: " +
                          r +
                          ";"
                      ),
                    (n = a.prop("outerHTML")),
                    a.remove();
                }
              }
              return n;
            },
            _box: function (i) {
              if (
                null != p.beforeShow && "function" == typeof p.beforeShow
                  ? !p.beforeShow(u.files, s, r, o, l)
                  : !1
              )
                return !1;
              if (s.length < 1) {
                if (p.appendTo) var t = e(p.appendTo);
                else var t = r;
                t.find(".jFiler-items").remove(),
                  (s = e('<div class="jFiler-items jFiler-row"></div>')),
                  (l.prop("jFiler").listEl = s),
                  s.append(u._assets.textParse(p.templates.box)).appendTo(t),
                  s.on("click", p.templates._selectors.remove, function (t) {
                    t.preventDefault();
                    var n = p.templates.removeConfirmation
                      ? confirm(p.captions.removeConfirmation)
                      : !0;
                    n &&
                      u._remove(
                        i ? i.remove.event : t,
                        i
                          ? i.remove.el
                          : e(this).closest(p.templates._selectors.item)
                      );
                  });
              }
              for (var n = 0; n < u.files.length; n++)
                u.files[n]._appended || (u.files[n]._choosed = !0),
                  u._addToMemory(n),
                  u._thumbCreator.create(n);
            },
          },
          _upload: function (i) {
            var t = u._itFc.html,
              n = new FormData();
            if (
              (n.append(
                l.attr("name"),
                u._itFc.file,
                u._itFc.file.name ? u._itFc.file.name : !1
              ),
              null != p.uploadFile.data && e.isPlainObject(p.uploadFile.data))
            )
              for (var a in p.uploadFile.data)
                n.append(a, p.uploadFile.data[a]);
            u._ajax.send(t, n, u._itFc);
          },
          _ajax: {
            send: function (i, t, n) {
              return (
                (n.ajax = e.ajax({
                  url: p.uploadFile.url,
                  data: t,
                  type: p.uploadFile.type,
                  enctype: p.uploadFile.enctype,
                  xhr: function () {
                    var t = e.ajaxSettings.xhr();
                    return (
                      t.upload &&
                        t.upload.addEventListener(
                          "progress",
                          function (e) {
                            u._ajax.progressHandling(e, i);
                          },
                          !1
                        ),
                      t
                    );
                  },
                  complete: function (e, i) {
                    (n.ajax = !1),
                      u._ajFc++,
                      u._ajFc >= u.files.length &&
                        ((u._ajFc = 0),
                        null != p.uploadFile.onComplete &&
                        "function" == typeof p.uploadFile.onComplete
                          ? p.uploadFile.onComplete(s, r, o, l, e, i)
                          : null);
                  },
                  beforeSend: function (e, t) {
                    return null != p.uploadFile.beforeSend &&
                      "function" == typeof p.uploadFile.beforeSend
                      ? p.uploadFile.beforeSend(i, s, r, o, l, n.id, e, t)
                      : !0;
                  },
                  success: function (e, t, a) {
                    (n.uploaded = !0),
                      null != p.uploadFile.success &&
                      "function" == typeof p.uploadFile.success
                        ? p.uploadFile.success(e, i, s, r, o, l, n.id, t, a)
                        : null;
                  },
                  error: function (e, t, a) {
                    (n.uploaded = !1),
                      null != p.uploadFile.error &&
                      "function" == typeof p.uploadFile.error
                        ? p.uploadFile.error(i, s, r, o, l, n.id, e, t, a)
                        : null;
                  },
                  statusCode: p.uploadFile.statusCode,
                  cache: !1,
                  contentType: !1,
                  processData: !1,
                })),
                n.ajax
              );
            },
            progressHandling: function (e, i) {
              if (e.lengthComputable) {
                var t = Math.round((100 * e.loaded) / e.total).toString();
                null != p.uploadFile.onProgress &&
                "function" == typeof p.uploadFile.onProgress
                  ? p.uploadFile.onProgress(t, i, s, r, o, l)
                  : null,
                  i
                    .find(".jFiler-jProgressBar")
                    .find(p.templates._selectors.progressBar)
                    .css("width", t + "%");
              }
            },
          },
          _dragDrop: {
            dragEnter: function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                r.addClass("dragged"),
                u._set("feedback", p.captions.drop),
                null != p.dragDrop.dragEnter &&
                "function" == typeof p.dragDrop.dragEnter
                  ? p.dragDrop.dragEnter(e, o, l, r)
                  : null;
            },
            dragLeave: function (e) {
              return (
                e.preventDefault(),
                e.stopPropagation(),
                u._dragDrop._dragLeaveCheck(e)
                  ? (r.removeClass("dragged"),
                    u._set("feedback", p.captions.feedback),
                    void (null != p.dragDrop.dragLeave &&
                    "function" == typeof p.dragDrop.dragLeave
                      ? p.dragDrop.dragLeave(e, o, l, r)
                      : null))
                  : !1
              );
            },
            drop: function (e) {
              e.preventDefault(),
                r.removeClass("dragged"),
                u._set("feedback", p.captions.feedback),
                e &&
                  e.originalEvent &&
                  e.originalEvent.dataTransfer &&
                  e.originalEvent.dataTransfer.files &&
                  e.originalEvent.dataTransfer.files.length > 0 &&
                  u._onChange(e, e.originalEvent.dataTransfer.files),
                null != p.dragDrop.drop && "function" == typeof p.dragDrop.drop
                  ? p.dragDrop.drop(
                      e.originalEvent.dataTransfer.files,
                      e,
                      o,
                      l,
                      r
                    )
                  : null;
            },
            _dragLeaveCheck: function (i) {
              var t = i.relatedTarget,
                n = !1;
              return t !== o && (t && (n = e.contains(o, t)), n) ? !1 : !0;
            },
          },
          _clipboardPaste: function (e, i) {
            if (
              (i ||
                e.originalEvent.clipboardData ||
                e.originalEvent.clipboardData.items) &&
              (!i ||
                e.originalEvent.dataTransfer ||
                e.originalEvent.dataTransfer.items) &&
              !u._clPsePre
            ) {
              var t = i
                  ? e.originalEvent.dataTransfer.items
                  : e.originalEvent.clipboardData.items,
                n = function (e, i, t) {
                  (i = i || ""), (t = t || 512);
                  for (var n = atob(e), l = [], a = 0; a < n.length; a += t) {
                    for (
                      var r = n.slice(a, a + t), o = new Array(r.length), s = 0;
                      s < r.length;
                      s++
                    )
                      o[s] = r.charCodeAt(s);
                    var d = new Uint8Array(o);
                    l.push(d);
                  }
                  var f = new Blob(l, { type: i });
                  return f;
                };
              if (t)
                for (var l = 0; l < t.length; l++)
                  if (
                    -1 !== t[l].type.indexOf("image") ||
                    -1 !== t[l].type.indexOf("text/uri-list")
                  ) {
                    if (i)
                      try {
                        window.atob(
                          e.originalEvent.dataTransfer
                            .getData("text/uri-list")
                            .toString()
                            .split(",")[1]
                        );
                      } catch (e) {
                        return;
                      }
                    var a = i
                      ? n(
                          e.originalEvent.dataTransfer
                            .getData("text/uri-list")
                            .toString()
                            .split(",")[1],
                          "image/png"
                        )
                      : t[l].getAsFile();
                    (a.name = Math.random().toString(36).substring(5)),
                      (a.name +=
                        -1 != a.type.indexOf("/")
                          ? "." + a.type.split("/")[1].toString().toLowerCase()
                          : ".png"),
                      u._onChange(e, [a]),
                      (u._clPsePre = setTimeout(function () {
                        delete u._clPsePre;
                      }, 1e3));
                  }
            }
          },
          _onSelect: function (i) {
            p.uploadFile && !e.isEmptyObject(p.uploadFile) && u._upload(i),
              null != p.onSelect && "function" == typeof p.onSelect
                ? p.onSelect(u.files[i], u._itFc.html, s, r, o, l)
                : null,
              i + 1 >= u.files.length &&
                (null != p.afterShow && "function" == typeof p.afterShow
                  ? p.afterShow(s, r, o, l)
                  : null);
          },
          _onChange: function (i, t) {
            if (t) {
              if (!t || 0 == t.length)
                return u._set("input", ""), u._clear(), !1;
              u.files = t;
            } else {
              if (
                !l.get(0).files ||
                "undefined" == typeof l.get(0).files ||
                0 == l.get(0).files.length
              )
                return (
                  p.uploadFile ||
                    p.addMore ||
                    (u._set("input", ""), u._clear()),
                  !1
                );
              u.files = l.get(0).files;
            }
            if (
              (p.uploadFile || p.addMore || u._reset(!0),
              (l.prop("jFiler").files = u.files),
              !u._filesCheck() ||
                (null != p.beforeSelect && "function" == typeof p.beforeSelect
                  ? !p.beforeSelect(u.files, s, r, o, l)
                  : !1))
            )
              return u._set("input", ""), u._clear(), !1;
            if (
              (u._set(
                "feedback",
                u.files.length + u._itFl.length + " " + p.captions.feedback2
              ),
              p.showThumbs)
            )
              u._thumbCreator._box();
            else
              for (var n = 0; n < u.files.length; n++)
                (u.files[n]._choosed = !0), u._addToMemory(n), u._onSelect(n);
            if (!p.uploadFile && p.addMore) {
              var a = e('<input type="file" />'),
                f = l.prop("attributes");
              e.each(f, function () {
                a.attr(this.name, this.value);
              }),
                l.after(a),
                u._unbindInput(),
                d.push(a),
                (l = a),
                u._bindInput(),
                u._set("props");
            }
          },
          _append: function (e, i) {
            var t = i ? i.files : !1;
            if (
              t &&
              !(t.length <= 0) &&
              ((u.files = t), (l.prop("jFiler").files = u.files), p.showThumbs)
            ) {
              for (var n = 0; n < u.files.length; n++)
                u.files[n]._appended = !0;
              u._thumbCreator._box();
            }
          },
          _getList: function (e, i) {
            var t = i ? i.files : !1;
            if (
              t &&
              !(t.length <= 0) &&
              ((u.files = t), (l.prop("jFiler").files = u.files), p.showThumbs)
            ) {
              for (var n = [], a = 0; a < u.files.length; a++)
                (u.files[a].forList = !0), n.push(u._thumbCreator.create(a));
              i.callback && i.callback(n, s, r, o, l);
            }
          },
          _retryUpload: function (i, t) {
            var n = parseInt(
                "object" == typeof t ? t.attr("data-jfiler-index") : t
              ),
              a = u._itFl.filter(function (e, i) {
                return e.id == n;
              });
            return a.length > 0
              ? !p.uploadFile || e.isEmptyObject(p.uploadFile) || a[0].uploaded
                ? void 0
                : ((u._itFc = a[0]),
                  (l.prop("jFiler").current_file = u._itFc),
                  u._upload(n),
                  !0)
              : !1;
          },
          _remove: function (i, n) {
            if (n.binded) {
              if (
                "undefined" != typeof n.data.id &&
                ((n = s.find(
                  p.templates._selectors.item +
                    "[data-jfiler-index='" +
                    n.data.id +
                    "']"
                )),
                0 == n.size())
              )
                return !1;
              n.data.el && (n = n.data.el);
            }
            var a = n.get(0).jfiler_id || n.attr("data-jfiler-index"),
              d = null,
              f = function (i) {
                var n = r
                    .find("input[name^='jfiler-items-exclude-']:hidden")
                    .first(),
                  a = u._itFl[i],
                  o = [];
                if (
                  (0 == n.size() &&
                    ((n = e(
                      '<input type="hidden" name="jfiler-items-exclude-' +
                        (p.excludeName
                          ? p.excludeName
                          : ("[]" != l.attr("name").slice(-2)
                              ? l.attr("name")
                              : l
                                  .attr("name")
                                  .substring(0, l.attr("name").length - 2)) +
                            "-" +
                            t) +
                        '">'
                    )),
                    n.appendTo(r)),
                  a.file._choosed || a.file._appended || a.uploaded)
                ) {
                  if (((u._prEr = !0), u._itFr.push(a), p.addMore)) {
                    var s = a.input,
                      d = 0;
                    u._itFl.filter(function (e, i) {
                      e.file._choosed && e.input.get(0) == s.get(0) && d++;
                    }),
                      1 == d &&
                        ((u._itFr = u._itFr.filter(function (e, i) {
                          return e.file._choosed
                            ? e.input.get(0) != s.get(0)
                            : !0;
                        })),
                        s.val(""),
                        (u._prEr = !1));
                  }
                  for (var f = 0; f < u._itFr.length; f++)
                    o.push(u._itFr[f].file.name);
                  (o = JSON.stringify(o)), n.val(o);
                }
              },
              c = function (i, t) {
                f(t),
                  u._itFl.splice(t, 1),
                  u._itFl.length < 1
                    ? (u._reset(), u._clear())
                    : u._set(
                        "feedback",
                        u._itFl.length + " " + p.captions.feedback2
                      ),
                  i.fadeOut("fast", function () {
                    e(this).remove();
                  });
              };
            for (var m in u._itFl)
              "length" !== m &&
                u._itFl.hasOwnProperty(m) &&
                u._itFl[m].id == a &&
                (d = m);
            return u._itFl.hasOwnProperty(d)
              ? u._itFl[d].ajax
                ? (u._itFl[d].ajax.abort(), void c(n, d))
                : (null != p.onRemove && "function" == typeof p.onRemove
                    ? p.onRemove(n, u._itFl[d].file, d, s, r, o, l)
                    : null,
                  void c(n, d))
              : !1;
          },
          _addToMemory: function (i) {
            u._itFl.push({
              id: u._itFl.length,
              file: u.files[i],
              html: e(),
              ajax: !1,
              uploaded: !1,
            }),
              p.addMore &&
                !u.files[i]._appended &&
                (u._itFl[u._itFl.length - 1].input = l),
              (u._itFc = u._itFl[u._itFl.length - 1]),
              (l.prop("jFiler").files_list = u._itFl),
              (l.prop("jFiler").current_file = u._itFc);
          },
          _assets: {
            bytesToSize: function (e) {
              if (0 == e) return "0 Byte";
              var i = 1e3,
                t = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                n = Math.floor(Math.log(e) / Math.log(i));
              return (e / Math.pow(i, n)).toPrecision(3) + " " + t[n];
            },
            hasAttr: function (e, i) {
              var i = i ? i : l,
                t = i.attr(e);
              return t && "undefined" != typeof t ? !0 : !1;
            },
            getIcon: function (i, t) {
              var n = ["audio", "image", "text", "video"];
              return e.inArray(t, n) > -1
                ? '<i class="icon-jfi-file-' +
                    t +
                    " jfi-file-ext-" +
                    i +
                    '"></i>'
                : '<i class="icon-jfi-file-o jfi-file-type-' +
                    t +
                    " jfi-file-ext-" +
                    i +
                    '"></i>';
            },
            textParse: function (i, t) {
              switch (
                ((t = e.extend(
                  {},
                  {
                    limit: p.limit,
                    maxSize: p.maxSize,
                    extensions: p.extensions ? p.extensions.join(",") : null,
                  },
                  t && e.isPlainObject(t) ? t : {},
                  p.options
                )),
                typeof i)
              ) {
                case "string":
                  return i.replace(/\{\{fi-(.*?)\}\}/g, function (e, i) {
                    return (
                      (i = i.replace(/ /g, "")),
                      i.match(/(.*?)\|limitTo\:(\d+)/)
                        ? i.replace(/(.*?)\|limitTo\:(\d+)/, function (
                            e,
                            i,
                            n
                          ) {
                            var i = t[i] ? t[i] : "",
                              l = i.substring(0, n);
                            return (l =
                              i.length > l.length
                                ? l.substring(0, l.length - 3) + "..."
                                : l);
                          })
                        : t[i]
                        ? t[i]
                        : ""
                    );
                  });
                case "function":
                  return i(t);
                default:
                  return i;
              }
            },
            text2Color: function (e) {
              if (!e || 0 == e.length) return !1;
              for (
                var i = 0, t = 0;
                i < e.length;
                t = e.charCodeAt(i++) + ((t << 5) - t)
              );
              for (
                var i = 0, n = "#";
                3 > i;
                n += ("00" + ((t >> (2 * i++)) & 255).toString(16)).slice(-2)
              );
              return n;
            },
          },
          files: null,
          _itFl: [],
          _itFc: null,
          _itFr: [],
          _ajFc: 0,
          _prEr: !1,
        };
      return (
        l
          .on("filer.append", function (e, i) {
            u._append(e, i);
          })
          .on("filer.remove", function (e, i) {
            (i.binded = !0), u._remove(e, i);
          })
          .on("filer.reset", function (e) {
            return u._reset(), u._clear(), !0;
          })
          .on("filer.generateList", function (e, i) {
            return u._getList(e, i);
          })
          .on("filer.retry", function (e, i) {
            return u._retryUpload(e, i);
          }),
        u.init(),
        this
      );
    });
  }),
    (e.fn.filer.defaults = {
      limit: null,
      maxSize: null,
      extensions: null,
      changeInput: !0,
      showThumbs: !1,
      appendTo: null,
      theme: "default",
      templates: {
        box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
        item:
          '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status">{{fi-progressBar}}</span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        itemAppend:
          '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status"></span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        progressBar: '<div class="bar"></div>',
        itemAppendToEnd: !1,
        removeConfirmation: !0,
        _selectors: {
          list: ".jFiler-items-list",
          item: ".jFiler-item",
          progressBar: ".bar",
          remove: ".jFiler-item-trash-action",
        },
      },
      files: null,
      uploadFile: null,
      dragDrop: null,
      addMore: !1,
      clipBoardPaste: !0,
      excludeName: null,
      beforeRender: null,
      afterRender: null,
      beforeShow: null,
      beforeSelect: null,
      onSelect: null,
      afterShow: null,
      onRemove: null,
      onEmpty: null,
      options: null,
      captions: {
        button: "Choose Files",
        feedback: "Choose files To Upload",
        feedback2: "files were chosen",
        drop: "Drop file here to Upload",
        removeConfirmation: "Are you sure you want to remove this file?",
        errors: {
          filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
          filesType: "Only Images are allowed to be uploaded.",
          filesSize:
            "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
          filesSizeAll:
            "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB.",
        },
      },
    });
})(jQuery);
