/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/constants"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module;

  $opal.add_stubs([]);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      $opal.cdecl($scope, 'DEFAULT_CANVAS_SELECTOR', "canvas")
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/asset"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass;

  $opal.add_stubs(['$attr_reader', '$new', '$private']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Asset(){};
        var self = $Asset = $klass($base, $super, 'Asset', $Asset);

        var def = self._proto, $scope = self._scope;

        def.path = nil;
        $opal.cdecl($scope, 'ASSETS_PATH', "./assets");

        self.$attr_reader("path");

        (function(self) {
          var $scope = self._scope, def = self._proto;

          return (self._proto['$[]'] = function(args) {
            var $a, self = this;

            args = $slice.call(arguments, 0);
            return ($a = self).$new.apply($a, [].concat(args));
          }, nil) && '[]'
        })(self.$singleton_class());

        def.$initialize = function(path) {
          var self = this;

          return self.path = path;
        };

        self.$private();

        return (def.$full_path = function() {
          var self = this;

          return "" + ($scope.get('ASSETS_PATH')) + "/" + (self.path);
        }, nil) && 'full_path';
      })(self, null)
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/image"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass;

  $opal.add_stubs(['$full_path', '$[]']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Image(){};
        var self = $Image = $klass($base, $super, 'Image', $Image);

        var def = self._proto, $scope = self._scope, TMP_1;

        def["native"] = nil;
        def.$initialize = TMP_1 = function(path) {var $zuper = $slice.call(arguments, 0);
          var self = this, $iter = TMP_1._p, $yield = $iter || nil;

          TMP_1._p = null;
          $opal.find_super_dispatcher(self, 'initialize', TMP_1, $iter).apply(self, $zuper);
          
      self["native"] = new Image();
      self["native"].src = self.$full_path();
    ;
        };

        def.$size = function() {
          var self = this;

          return $scope.get('V')['$[]'](self["native"].width, self["native"].height);
        };

        def.$width = function() {
          var self = this;

          return self["native"].width;
        };

        def.$height = function() {
          var self = this;

          return self["native"].height;
        };

        return (def.$to_n = function() {
          var self = this;

          return self["native"];
        }, nil) && 'to_n';
      })(self, $scope.get('Asset'))
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/sound"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass;

  $opal.add_stubs(['$full_path', '$<<', '$shift', '$each']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Sound(){};
        var self = $Sound = $klass($base, $super, 'Sound', $Sound);

        var def = self._proto, $scope = self._scope, TMP_1;

        def.buffer = def.sources = nil;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        $opal.cdecl($scope, 'CONTEXT', new AudioContext());

        def.$initialize = TMP_1 = function(path) {var $zuper = $slice.call(arguments, 0);
          var self = this, $iter = TMP_1._p, $yield = $iter || nil;

          TMP_1._p = null;
          $opal.find_super_dispatcher(self, 'initialize', TMP_1, $iter).apply(self, $zuper);
          self.sources = [];
          
      var request = new XMLHttpRequest();
      request.open('GET', self.$full_path(), true);
      request.responseType = 'arraybuffer';

      request.onload = function() {
        $scope.get('CONTEXT').decodeAudioData(request.response, function(buffer) {
          self.buffer = buffer;
        });
      }

      request.send();
    ;
        };

        def.$play = function() {
          var $a, self = this;

          if ((($a = self.buffer) !== nil && (!$a._isBoolean || $a == true))) {
            } else {
            return nil
          };
          
      var source = $scope.get('CONTEXT').createBufferSource();
      source.buffer = self.buffer;
      source.connect($scope.get('CONTEXT').destination);

      self.sources['$<<'](source)

      source.onended = function() {
        self.sources.$shift()
      }

      source.start(0);
    ;
        };

        return (def.$stop = function() {
          var $a, $b, TMP_2, self = this;

          return ($a = ($b = self.sources).$each, $a._p = (TMP_2 = function(s){var self = TMP_2._s || this;
if (s == null) s = nil;
          try { s.stop(0) } catch(e) {};
            return nil;}, TMP_2._s = self, TMP_2), $a).call($b);
        }, nil) && 'stop';
      })(self, $scope.get('Asset'))
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/display"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass, $hash2 = $opal.hash2;

  $opal.add_stubs(['$attr_reader', '$fetch', '$size=', '$font_family=', '$font_size=', '$[]', '$x', '$y', '$to_hex', '$+', '$[]=', '$push', '$dup', '$pop', '$size', '$to_n']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Display(){};
        var self = $Display = $klass($base, $super, 'Display', $Display);

        var def = self._proto, $scope = self._scope;

        def.canvas = def.context = def.font_size = def.font_family = def.transform = def.transforms = nil;
        self.$attr_reader("font_family", "font_size");

        def.$initialize = function(options) {
          var self = this, canvas_selector = nil;

          if (options == null) {
            options = $hash2([], {})
          }
          canvas_selector = options.$fetch("canvas_selector", $scope.get('DEFAULT_CANVAS_SELECTOR'));
          self.canvas = document.querySelectorAll(canvas_selector)[0];
          self.context = self.canvas.getContext('2d');
          self['$size='](options.$fetch("size", $scope.get('DEFAULT_DISPLAY_SIZE')));
          self['$font_family=']($scope.get('DEFAULT_DISPLAY_FONT_FAMILY'));
          self['$font_size=']($scope.get('DEFAULT_DISPLAY_FONT_SIZE'));
          self.transform = [1, 0, 0, 1, 0, 0];
          return self.transforms = [];
        };

        def.$size = function() {
          var self = this;

          return $scope.get('V')['$[]'](self.canvas.width, self.canvas.height);
        };

        def['$size='] = function(value) {
          var self = this;

          self.canvas.width =  value.$x();
          return self.canvas.height = value.$y();
        };

        def.$width = function() {
          var self = this;

          return self.canvas.width;
        };

        def['$width='] = function(value) {
          var self = this;

          return self.canvas.width =  value.$x();
        };

        def.$height = function() {
          var self = this;

          return self.canvas.height;
        };

        def['$height='] = function(value) {
          var self = this;

          return self.canvas.height =  value.$x();
        };

        def.$fill_color = function() {
          var self = this;

          return $scope.get('C')['$[]'](self.context.fillStyle);
        };

        def['$fill_color='] = function(color) {
          var self = this;

          return self.context.fillStyle = color.$to_hex();
        };

        def.$stroke_color = function() {
          var self = this;

          return $scope.get('C')['$[]'](self.context.strokeStyle);
        };

        def['$stroke_color='] = function(color) {
          var self = this;

          return self.context.strokeStyle = color.$to_hex();
        };

        def.$stroke_width = function() {
          var self = this;

          return self.context.lineWidth;
        };

        def['$stroke_width='] = function(numeric) {
          var self = this;

          return self.context.lineWidth = numeric;
        };

        def['$font_family='] = function(type) {
          var self = this, font = nil;

          self.font_family = type;
          font = "" + (self.font_size) + "px " + (self.font_family);
          return self.context.font = font;
        };

        def['$font_size='] = function(size) {
          var self = this, font = nil;

          self.font_size = size;
          font = "" + (self.font_size) + "px " + (self.font_family);
          return self.context.font = font;
        };

        def.$color_at = function(position) {
          var self = this, data = nil;

          data = self.context.getImageData(position.$x(), position.$y(), 1, 1).data;
          return $scope.get('C')['$[]'](data[0], data[1], data[2]);
        };

        def.$transformation = function() {
          var self = this;

          return self.transform['$+']([0, 0, 1]);
        };

        def.$translate = function(displacement) {
          var $a, $b, self = this;

          ($a = 4, $b = self.transform, $b['$[]=']($a, $b['$[]']($a)['$+'](self.transform['$[]'](0) * displacement.$x() +
                      self.transform['$[]'](2) * displacement.$y())));
          ($a = 5, $b = self.transform, $b['$[]=']($a, $b['$[]']($a)['$+'](self.transform['$[]'](1) * displacement.$x() +
                      self.transform['$[]'](3) * displacement.$y())));
          
      self.context.setTransform(self.transform['$[]'](0), self.transform['$[]'](1),
                             self.transform['$[]'](2), self.transform['$[]'](3),
                             self.transform['$[]'](4), self.transform['$[]'](5)); ;
        };

        def.$scale = function(multiplier) {
          var self = this;

          
      self.transform = [self.transform['$[]'](0) * multiplier.$x(),
                       self.transform['$[]'](1) * multiplier.$x(),
                       self.transform['$[]'](2) * multiplier.$y(),
                       self.transform['$[]'](3) * multiplier.$y(),
                       self.transform['$[]'](4), self.transform['$[]'](5)];

      self.context.setTransform(self.transform['$[]'](0), self.transform['$[]'](1),
                             self.transform['$[]'](2), self.transform['$[]'](3),
                             self.transform['$[]'](4), self.transform['$[]'](5)); ;
        };

        def.$rotate = function(radians) {
          var self = this;

          
      var cos = Math.cos(radians),
          sin = Math.sin(radians),
          e0 = self.transform['$[]'](0) * cos + self.transform['$[]'](2) * sin,
          e1 = self.transform['$[]'](1) * cos + self.transform['$[]'](3) * sin,
          e2 = self.transform['$[]'](0) * -sin + self.transform['$[]'](2) * cos,
          e3 = self.transform['$[]'](1) * -sin + self.transform['$[]'](3) * cos;

      self.transform = [e0, e1, e2, e3, self.transform['$[]'](4), self.transform['$[]'](5)];

      self.context.setTransform(self.transform['$[]'](0), self.transform['$[]'](1),
                             self.transform['$[]'](2), self.transform['$[]'](3),
                             self.transform['$[]'](4), self.transform['$[]'](5)); ;
        };

        def.$push = function() {
          var self = this;

          return self.transforms.$push(self.transform.$dup());
        };

        def.$pop = function() {
          var self = this;

          self.transform = self.transforms.$pop();
          
      self.context.setTransform(self.transform['$[]'](0), self.transform['$[]'](1),
                             self.transform['$[]'](2), self.transform['$[]'](3),
                             self.transform['$[]'](4), self.transform['$[]'](5)); ;
        };

        def.$stroke_line = function(start_pos, end_pos) {
          var self = this;

          
      self.context.beginPath();
      self.context.moveTo(start_pos.$x(), start_pos.$y());
      self.context.lineTo(end_pos.$x(), end_pos.$y());
      self.context.closePath();
      self.context.stroke();
    ;
        };

        def.$stroke_rectangle = function(position, size) {
          var self = this;

          return self.context.strokeRect(position.$x(), position.$y(), size.$x(), size.$y());
        };

        def.$fill_rectangle = function(position, size) {
          var self = this;

          return self.context.fillRect(position.$x(), position.$y(), size.$x(), size.$y());
        };

        def.$stroke_ellipse = function(center, radius) {
          var self = this;

          
      self.context.beginPath();
      self.context.save();
      self.context.beginPath();
      self.context.translate(center.$x() - radius.$x(),
                          center.$y() - radius.$y());
      self.context.scale(radius.$x(), radius.$y());
      self.context.arc(1, 1, 1, 0, 2 * Math.PI, false);
      self.context.restore();
      self.context.stroke();
    ;
        };

        def.$fill_ellipse = function(center, radius) {
          var self = this;

          
      self.context.beginPath();
      self.context.save();
      self.context.beginPath();
      self.context.translate(center.$x() - radius.$x(),
                          center.$y() - radius.$y());
      self.context.scale(radius.$x(), radius.$y());
      self.context.arc(1, 1, 1, 0, 2 * Math.PI, false);
      self.context.restore();
      self.context.fill();
    ;
        };

        def.$clear = function() {
          var self = this;

          return self.context.fillRect(0, 0, self.$size().$x(), self.$size().$y());
        };

        def.$begin_shape = function() {
          var self = this;

          return self.context.beginPath();
        };

        def.$end_shape = function() {
          var self = this;

          return self.context.closePath();
        };

        def.$move_to = function(position) {
          var self = this;

          return self.context.moveTo(position.$x(), position.$y());
        };

        def.$line_to = function(position) {
          var self = this;

          return self.context.lineTo(position.$x(), position.$y());
        };

        def.$curve_to = function(position, control) {
          var self = this;

          return self.context.quadraticCurveTo(control.$x(), control.$y(),
                                position.$x(), position.$y());
        };

        def.$curve2_to = function(position, control1, control2) {
          var self = this;

          return self.context.bezierCurveTo(control1.$x(), control1.$y(),
                             control2.$x(), control2.$y(),
                             position.$x(), position.$y());
        };

        def.$stroke_shape = function() {
          var self = this;

          return self.context.stroke();
        };

        def.$fill_shape = function() {
          var self = this;

          return self.context.fill();
        };

        def.$image = function(image, position) {
          var self = this;

          return self.context.drawImage(image.$to_n(), position.$x(), position.$y());
        };

        def.$image_cropped = function(image, position, crop_position, crop_size) {
          var self = this;

          return self.context.drawImage(image.$to_n(),
                           crop_position.$x(), crop_position.$y(),
                           crop_size.$x(), crop_size.$y(),
                           position.$x(), position.$y(),
                           crop_size.$x(), crop_size.$y());
        };

        def.$fill_text = function(text, position) {
          var self = this;

          return self.context.fillText(text, position.$x(), position.$y());
        };

        return (def.$stroke_text = function(text, position) {
          var self = this;

          return self.context.strokeText(text, position.$x(), position.$y());
        }, nil) && 'stroke_text';
      })(self, null)
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/keyboard"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass, $hash = $opal.hash, $hash2 = $opal.hash2;

  $opal.add_stubs(['$fetch', '$[]', '$!', '$[]=', '$tick_count', '$==']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Keyboard(){};
        var self = $Keyboard = $klass($base, $super, 'Keyboard', $Keyboard);

        var def = self._proto, $scope = self._scope;

        def.pressed_keys = def.ticker = def.released_keys = nil;
        $opal.cdecl($scope, 'KEY_MAP', $hash(0, "fn", 8, "backspace", 9, "tab", 13, "enter", 16, "shift", 17, "ctrl", 18, "alt", 19, "pause", 20, "caps_lock", 27, "escape", 33, "page_up", 34, "page_down", 35, "end", 36, "home", 37, "left", 38, "up", 39, "right", 40, "down", 45, "insert", 46, "delete", 48, 0, 49, 1, 50, 2, 51, 3, 52, 4, 53, 5, 54, 6, 55, 7, 56, 8, 57, 9, 65, "a", 66, "b", 67, "c", 68, "d", 69, "e", 70, "f", 71, "g", 72, "h", 73, "i", 74, "j", 75, "k", 76, "l", 77, "m", 78, "n", 79, "o", 80, "p", 81, "q", 82, "r", 83, "s", 84, "t", 85, "u", 86, "v", 87, "w", 88, "x", 89, "y", 90, "z", 91, "super", 92, "super", 96, "num0", 97, "num1", 98, "num2", 99, "num3", 100, "num4", 101, "num5", 102, "num6", 103, "num7", 104, "num8", 105, "num9", 106, "num_asterisk", 107, "num_plus", 109, "num_minus", 110, "num_dot", 111, "num_slash", 112, "f1", 113, "f2", 114, "f3", 115, "f4", 116, "f5", 117, "f6", 118, "f7", 119, "f8", 120, "f9", 121, "f10", 122, "f11", 123, "f12", 144, "num_lock", 145, "scroll_lock", 186, "semicolon", 187, "equals", 188, "comma", 189, "minus", 190, "dot", 191, "slash", 192, "backquote", 219, "left_bracket", 220, "backslash", 221, "right_bracket", 222, "quote"));

        def.$initialize = function(options) {
          var self = this, key = nil;

          if (options == null) {
            options = $hash2([], {})
          }
          self.ticker = options.$fetch("ticker");
          self.pressed_keys = $hash2([], {});
          self.released_keys = $hash2([], {});
          
      window.addEventListener('keydown', function(event) {
        key = $scope.get('KEY_MAP')['$[]'](event.keyCode)
        if (self.pressed_keys['$[]'](key)['$!']()) {
          self.pressed_keys['$[]='](key, self.ticker.$tick_count())
        }
      });

      window.addEventListener('keyup', function(event) {
        key = $scope.get('KEY_MAP')['$[]'](event.keyCode)
        self.released_keys['$[]='](key, self.ticker.$tick_count())
        self.pressed_keys['$[]='](key, nil)
      });
    ;
        };

        def['$pressing?'] = function(key) {
          var $a, self = this;

          return ((($a = self.pressed_keys['$[]'](key)['$!']()['$!']()) !== false && $a !== nil) ? $a : false);
        };

        def['$pressed?'] = function(key) {
          var self = this;

          return self.pressed_keys['$[]'](key)['$=='](self.ticker.$tick_count());
        };

        return (def['$released?'] = function(key) {
          var self = this;

          return self.released_keys['$[]'](key)['$=='](self.ticker.$tick_count());
        }, nil) && 'released?';
      })(self, null)
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/mouse"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass, $hash = $opal.hash, $hash2 = $opal.hash2;

  $opal.add_stubs(['$attr_reader', '$fetch', '$[]', '$!', '$[]=', '$tick_count', '$==']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Mouse(){};
        var self = $Mouse = $klass($base, $super, 'Mouse', $Mouse);

        var def = self._proto, $scope = self._scope;

        def.canvas = def.pressed_buttons = def.ticker = def.released_buttons = nil;
        $opal.cdecl($scope, 'BUTTON_MAP', $hash(0, "left", 1, "middle", 2, "right", 3, 4, 4, 5));

        self.$attr_reader("position");

        def.$initialize = function(args) {
          var self = this, canvas_selector = nil, button = nil;

          if (args == null) {
            args = $hash2([], {})
          }
          canvas_selector = args.$fetch("canvas_selector", $scope.get('DEFAULT_CANVAS_SELECTOR'));
          self.ticker = args.$fetch("ticker");
          self.canvas = document.querySelectorAll(canvas_selector)[0];
          self.pressed_buttons = $hash2([], {});
          self.released_buttons = $hash2([], {});
          
      self.canvas.addEventListener('mousemove', function(event) {
        if (event.offsetX) {
          self.position = $scope.get('V')['$[]'](event.offsetX, event.offsetY)
        } else {
          self.position = $scope.get('V')['$[]'](event.layerX, event.layerY)
        }
      });

      self.canvas.addEventListener('mousedown', function(event) {
        button = $scope.get('BUTTON_MAP')['$[]'](event.button)
        if (self.pressed_buttons['$[]'](button)['$!']()) {
          self.pressed_buttons['$[]='](button, self.ticker.$tick_count())
        }
      });

      self.canvas.addEventListener('mouseup', function(event) {
        button = $scope.get('BUTTON_MAP')['$[]'](event.button)
        self.released_buttons['$[]='](button, self.ticker.$tick_count())
        self.pressed_buttons['$[]='](button, nil)
      });
    ;
        };

        def['$pressing?'] = function(button) {
          var $a, self = this;

          return ((($a = self.pressed_buttons['$[]'](button)['$!']()['$!']()) !== false && $a !== nil) ? $a : false);
        };

        def['$pressed?'] = function(button) {
          var self = this;

          return self.pressed_buttons['$[]'](button)['$=='](self.ticker.$tick_count());
        };

        return (def['$released?'] = function(button) {
          var self = this;

          return self.released_buttons['$[]'](button)['$=='](self.ticker.$tick_count());
        }, nil) && 'released?';
      })(self, null)
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
Opal.modules["yeah/web/ticker"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass, $hash2 = $opal.hash2;

  $opal.add_stubs(['$attr_reader', '$fetch', '$rate', '$+']);
  return (function($base) {
    var self = $module($base, 'Yeah');

    var def = self._proto, $scope = self._scope;

    (function($base) {
      var self = $module($base, 'Web');

      var def = self._proto, $scope = self._scope;

      (function($base, $super) {
        function $Ticker(){};
        var self = $Ticker = $klass($base, $super, 'Ticker', $Ticker);

        var def = self._proto, $scope = self._scope, TMP_1;

        def.tick_count = nil;
        self.$attr_reader("rate", "tick_count");

        def.$initialize = function(args) {
          var self = this;

          if (args == null) {
            args = $hash2([], {})
          }
          self.rate = args.$fetch("rate", $scope.get('DEFAULT_TICKER_RATE'));
          return self.tick_count = 0;
        };

        return (def.$on_tick = TMP_1 = function() {
          var $a, self = this, $iter = TMP_1._p, block = $iter || nil;

          TMP_1._p = null;
          
      var lastTime = (new Date()).getTime(),
          elapsed = 0,
          interval = 1/self.$rate(),
          currentTime;

      var loop = function() {
        currentTime = new Date().getTime();
        elapsed = (currentTime - lastTime) / 1000;

        if (elapsed > interval) {
          ((($a = $opal.$yield1(block, elapsed)) === $breaker) ? $breaker.$v : $a)

          self.tick_count = self.tick_count['$+'](1)

          lastTime = currentTime - (elapsed % interval);
        }

        window.requestAnimationFrame(loop);
      };

      window.requestAnimationFrame(loop);
    ;
        }, nil) && 'on_tick';
      })(self, null)
      
    })(self)
    
  })(self)
};

/* Generated by Opal 0.7.0.dev */
(function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice;

  $opal.add_stubs(['$require']);
  self.$require("yeah/web/constants");
  self.$require("yeah/web/asset");
  self.$require("yeah/web/image");
  self.$require("yeah/web/sound");
  self.$require("yeah/web/display");
  self.$require("yeah/web/keyboard");
  self.$require("yeah/web/mouse");
  return self.$require("yeah/web/ticker");
})(Opal);

//# sourceMappingURL=yeah/web.map
;
