var responsiveDesign = {
  isResponsive: false,
  isDesktop: false,
  isTablet: false,
  isPhone: false,
  lockedResponsiveMode: "",

  responsiveType: "desktop",
  responsiveTypeIdx: 1,
  lockedResponsiveType: "",

  isCurrentDefaultResponsive: false,

  defaultResponsive: [false, true, true, true, true],

  windowWidth: 0,

  responsive: (function ($) {
    "use strict";
    return function () {
      var html = $("html");
      this.windowWidth = $(window).width();
      var triggerEvent = false;

      var isRespVisible = $("#resp").is(":visible");
      if (this.lockedResponsiveMode === "desktop") isRespVisible = false;

      if (isRespVisible && !this.isResponsive) {
        html.addClass("responsive").removeClass("desktop");
        this.isResponsive = true;
        this.isDesktop = false;
        triggerEvent = true;
      } else if (!isRespVisible && !this.isDesktop) {
        html
          .addClass("desktop")
          .removeClass(
            "responsive default-responsive responsive-tablet responsive-phone"
          );
        this.isResponsive = this.isTablet = this.isPhone = false;
        this.isDesktop = true;
        triggerEvent = true;
      }

      if (this.isResponsive) {
        var isTablet =
          this.lockedResponsiveMode === "tablet" ||
          ($("#resp-t").is(":visible") && this.lockedResponsiveMode === "");
        var isPhone =
          this.lockedResponsiveMode === "phone" ||
          ($("#resp-m").is(":visible") && this.lockedResponsiveMode === "");
        if (isTablet && !this.isTablet) {
          html.addClass("responsive-tablet").removeClass("responsive-phone");
          this.isTablet = true;
          this.isPhone = false;
          triggerEvent = true;
        } else if (isPhone && !this.isPhone) {
          html.addClass("responsive-phone").removeClass("responsive-tablet");
          this.isTablet = false;
          this.isPhone = true;
          triggerEvent = true;
        }
      }

      var prevResponsiveIndx = this.responsiveTypeIdx;
      if (
        this.lockedResponsiveType === "tabletlandscape" ||
        ($("#resp-tablet-landscape").is(":visible") &&
          this.lockedResponsiveType === "")
      ) {
        this.responsiveType = "tabletlandscape";
        this.responsiveTypeIdx = 1;
      } else if (
        this.lockedResponsiveType === "tabletportrait" ||
        ($("#resp-tablet-portrait").is(":visible") &&
          this.lockedResponsiveType === "")
      ) {
        this.responsiveType = "tabletportrait";
        this.responsiveTypeIdx = 2;
      } else if (
        this.lockedResponsiveType === "phonelandscape" ||
        ($("#resp-phone-landscape").is(":visible") &&
          this.lockedResponsiveType === "")
      ) {
        this.responsiveType = "phonelandscape";
        this.responsiveTypeIdx = 3;
      } else if (
        this.lockedResponsiveType === "phoneportrait" ||
        ($("#resp-phone-portrait").is(":visible") &&
          this.lockedResponsiveType === "")
      ) {
        this.responsiveType = "phoneportrait";
        this.responsiveTypeIdx = 4;
      } else {
        this.responsiveType = "desktop";
        this.responsiveTypeIdx = 0;
      }

      if (triggerEvent || prevResponsiveIndx !== this.responsiveTypeIdx) {
        triggerEvent = true;

        if (
          this.isResponsive &&
          this.defaultResponsive[this.responsiveTypeIdx]
        ) {
          this.isCurrentDefaultResponsive = true;
          html.removeClass("custom-responsive").addClass("default-responsive");
        } else {
          this.isCurrentDefaultResponsive = false;
          html.removeClass("default-responsive").addClass("custom-responsive");
        }
      }

      if (triggerEvent) {
        $(window).trigger("responsive", this);
      }

      $(window).trigger("responsiveResize", this);
    };
  })(jQuery),
  initialize: (function ($) {
    "use strict";
    return function () {
      if (typeof defaultResponsiveData !== "undefined")
        responsiveDesign.defaultResponsive = defaultResponsiveData;

      $(
        '<div id="resp"><div id="resp-m"></div><div id="resp-t"></div></div>'
      ).appendTo("body");
      $(
        '<div id="resp-tablet-landscape" /><div id="resp-tablet-portrait" /><div id="resp-phone-landscape" /><div id="resp-phone-portrait" />'
      ).appendTo("body");

      $(window).resize(function () {
        responsiveDesign.responsive();
      });

      $(window).trigger("resize");
    };
  })(jQuery),

  lockResponsiveType: function (mode) {
    responsiveDesign.lockedResponsiveType = mode;

    if (mode.indexOf("tablet") === 0) mode = "tablet";
    if (mode.indexOf("phone") === 0) mode = "phone";

    responsiveDesign.lockedResponsiveMode = mode;
  },

  toogleDefaultResponsive: function (type, val) {
    var old = responsiveDesign.defaultResponsive[type];
    responsiveDesign.defaultResponsive[type] = val;
    if (old !== val) responsiveDesign.responsiveTypeIdx = -1;
  },
};

function responsiveAbsBg(responsiveDesign, el, bg) {
  "use strict";
  if (bg.length === 0) return;

  var desktopBgTop = bg.attr("data-bg-top");
  var desktopBgHeight = bg.attr("data-bg-height");

  if (responsiveDesign.isResponsive) {
    if (typeof desktopBgTop === "undefined" || desktopBgTop === false) {
      bg.attr("data-bg-top", bg.css("top"));
      bg.attr("data-bg-height", bg.css("height"));
    }

    var elTop = el.offset().top;
    var elHeight = el.outerHeight();
    bg.css("top", elTop + "px");
    bg.css("height", elHeight + "px");
  } else if (typeof desktopBgTop !== "undefined" && desktopBgTop !== false) {
    bg.css("top", desktopBgTop);
    bg.css("height", desktopBgHeight);
    bg.removeAttr("data-bg-top");
    bg.removeAttr("data-bg-height");
  }
}

var responsiveImages = (function ($) {
  "use strict";
  return function (responsiveDesign) {
    $("img[width]").each(function () {
      var img = $(this),
        newWidth = "",
        newMaxWidth = "",
        newHeight = "";
      if (responsiveDesign.isResponsive) {
        newWidth = "auto";
        newHeight = "auto";
        newMaxWidth = "100%";

        var widthAttr = img.attr("width");
        if (
          widthAttr !== null &&
          typeof widthAttr === "string" &&
          widthAttr.indexOf("%") === -1
        ) {
          newWidth = "100%";
          newMaxWidth = parseInt($.trim(widthAttr), 10) + "px";
        }
      }
      img
        .css("width", newWidth)
        .css("max-width", newMaxWidth)
        .css("height", newHeight);
    });
  };
})(jQuery);

var responsiveVideos = (function ($) {
  "use strict";
  return function (responsiveDesign) {
    $("iframe[width],object[width],embed[width]").each(function () {
      var obj = $(this);
      if (
        (obj.is("[width]") && obj.attr("width").indexOf("%") !== -1) ||
        (obj.is("[class]") && obj.attr("class").indexOf("twitter") !== -1) ||
        (obj.id && obj.id.indexOf("google") !== -1)
      )
        return;
      var container = obj.parent(".responsive-embed");
      if (responsiveDesign.isResponsive) {
        if (container.length !== 0) return;
        container = $('<div class="responsive-embed">').insertBefore(obj);
        obj.appendTo(container);
      } else if (container.length > 0) {
        obj.insertBefore(container);
        container.remove();
      }
    });
  };
})(jQuery);

var responsiveTextblocks = (function ($) {
  "use strict";
  return function (slider, responsiveDesign) {
    slider.find(".textblock").each(function () {
      if (parseInt(slider.attr("data-width"), 10) === 0) {
        return true;
      }
      var tb = $(this);
      var c = slider.width() / slider.attr("data-width");
      tb.css({
        height: "",
        width: "",
        top: "",
        "margin-left": "",
      });
      if (responsiveDesign.isResponsive) {
        var tbHeight = parseInt(tb.css("height"), 10);
        var tbWidth = parseInt(tb.css("width"), 10);
        var tbTop = parseInt(tb.css("top"), 10);
        var tbMargin = parseInt(tb.css("margin-left"), 10);
        tb.add(tb.find("div")).css({
          height: tbHeight * c,
          width: tbWidth * c,
        });
        tb.css("top", tbTop * c);
        tb.attr("style", function (i, s) {
          return s + "margin-left: " + tbMargin * c + "px !important";
        });
      }
    });
  };
})(jQuery);

var responsiveSlider = (function ($) {
  "use strict";
  return function (responsiveDesign) {
    $(".slider").each(function () {
      var s = $(this);

      var isHeaderSlider =
        s.parent(".header").length > 0 || s.parent(".pageslider").length > 0;
      if (!isHeaderSlider && responsiveDesign.isResponsive) {
        responsiveTextblocks(s, responsiveDesign);
        return;
      }

      var initialWidth = s.attr("data-width");
      var initialHeight = s.attr("data-height");

      var obj = s.data("slider");
      if (!obj) {
        return false;
      }

      var inner = s.find(".slider-inner");

      if (!responsiveDesign.isResponsive && obj.settings.helper) {
        obj.settings.helper.updateSize(inner, {
          width: initialWidth,
          height: initialHeight,
        });
        return;
      }

      if (obj && obj.settings.helper) {
        $(window).on("responsiveResize", function updateSize() {
          if (obj.settings.animation === "fade") return;
          if (responsiveDesign.isCurrentDefaultResponsive) {
            obj.settings.helper.updateSize(inner, {
              width: initialWidth,
              height: initialHeight,
            });
            $.each(inner.children(), function () {
              $(this).css(
                "background-position",
                -Math.floor(
                  initialWidth / 2 - parseInt(inner.outerWidth(), 10) / 2
                ) +
                  "px" +
                  -Math.floor(
                    initialHeight / 2 - parseInt(inner.outerHeight(), 10) / 2
                  ) +
                  "px "
              );
            });
          } else {
            $(window).off("responsiveResize", updateSize);
          }
        });
      }
    });
  };
})(jQuery);

var responsiveCollages = (function ($) {
  "use strict";
  return function (responsiveDesign) {
    $(".collage").each(function () {
      var collage = $(this);
      var slider = collage.find(".slider");

      var initialWidth = slider.attr("data-width");
      var initialHeight = slider.attr("data-height");

      var parent = collage.closest(":not(.image-caption-wrapper, .collage)");
      var parentIcw = collage.closest(".image-caption-wrapper");
      var parentWidth = parent.width();
      var collageWidth = collage.width();

      var doms = collage
        .add(slider)
        .add(collage.closest(".image-caption-wrapper"));

      if (
        (responsiveDesign.isResponsive && collageWidth > parentWidth) ||
        (parentIcw.length > 0 && collageWidth > parentIcw.width())
      ) {
        doms.css("width", "100%");
      }

      collageWidth = collage.width();
      if (collageWidth > initialWidth) {
        doms.css("width", "");
      }

      var c = slider.width() / initialWidth;
      var h = c * initialHeight;
      slider.css("height", h + "px");
    });
  };
})(jQuery);

jQuery(window).bind(
  "responsive",
  (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
      $(window).trigger("responsivePage", responsiveDesign);
      responsiveImages(responsiveDesign);
      responsiveVideos(responsiveDesign);

      responsiveSlider(responsiveDesign);
      responsiveNavigator(responsiveDesign);
    };
  })(jQuery)
);

jQuery(window).bind(
  "responsiveResize",
  (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
      responsiveCollages(responsiveDesign);
      responsiveNavigator(responsiveDesign);
    };
  })(jQuery)
);

jQuery(function ($) {
  if (!browser.ie || browser.version > 8) return;
  var timeout;
  $(window).on("resize", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      responsiveCollages(responsiveDesign);
      responsiveNavigator(responsiveDesign);
    }, 25);
  });
  responsiveCollages(responsiveDesign);
  responsiveNavigator(responsiveDesign);
});

jQuery(window).bind(
  "responsiveResize",
  (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
      responsiveAbsBg(responsiveDesign, $("nav.nav"), $("#hmenu-bg"));
      $(window).trigger("responsiveNav", {
        responsiveDesign: responsiveDesign,
      });
    };
  })(jQuery)
);

jQuery(function ($) {
  "use strict";
  $(".hmenu a").each(function () {
    var link = $(this);
    if (link.get(0).href === location.href) {
      link.addClass("active").parents("li").addClass("active");
      return false;
    }
  });
});

jQuery(function ($) {
  $('<a href="#" class="menu-btn"><span></span><span></span><span></span></a>')
    .insertBefore(".hmenu")
    .click(function (e) {
      var menu = $(this).next();
      if (menu.is(":visible")) {
        menu.slideUp("fast", function () {
          $(this).removeClass("visible").css("display", "");
        });
      } else {
        menu.slideDown("fast", function () {
          $(this).addClass("visible").css("display", "");
        });
      }
      e.preventDefault();
    });
});

jQuery(window).bind(
  "responsiveNav",
  (function ($) {
    "use strict";
    return function (event, options) {
      if (options.responsiveDesign.isDesktop && $("li.ext").length > 0) {
        menuExtendedCreate();
      }
    };
  })(jQuery)
);

var responsiveLayoutCell = (function ($) {
  "use strict";
  return function (responsiveDesign) {
    $(".content .content-layout-row,.footer .content-layout-row").each(
      function () {
        var row = $(this);
        var rowChildren = row.children(".layout-cell");
        if (rowChildren.length > 0) {
          var c;
          row
            .removeClass("responsive-layout-row-2")
            .removeClass("responsive-layout-row-3")
            .removeClass("responsive-layout-row-1");
          if (rowChildren.length === 1) {
            c = 1;
            row.addClass("responsive-layout-row-1");
          } else if (rowChildren.length % 2 === 0) {
            var c = 2;
            row.addClass("responsive-layout-row-2");
          } else {
            var c = 3;
            row.addClass("responsive-layout-row-3");
          }
          if (c > 0 && responsiveDesign.isTablet) {
            rowChildren
              .addClass("responsive-tablet-layout-cell")
              .each(function (i) {
                if ((i + 1) % c === 0) {
                  $(this).after('<div class="cleared responsive-cleared">');
                }
              });
          } else {
            rowChildren.removeClass("responsive-tablet-layout-cell");
            row.children(".responsive-cleared").remove();
          }
        }
      }
    );
  };
})(jQuery);

jQuery(window).bind("responsive", function (event, responsiveDesign) {
  "use strict";

  responsiveLayoutCell(responsiveDesign);
});

if (!browser.ie || browser.version > 8) {
  jQuery(responsiveDesign.initialize);
} else {
  jQuery("html").addClass("desktop");
}
