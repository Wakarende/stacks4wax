"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGenres = void 0;

var _react = require("react");

var _firestore = require("firebase/firestore");

var _firebaseConfig = require("../../utils/firebaseConfig");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useGenres = function useGenres() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      genres = _useState2[0],
      setGenres = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  var db = (0, _firestore.getFirestore)(_firebaseConfig.app);
  (0, _react.useEffect)(function () {
    var fetchGenres = function fetchGenres() {
      var querySnapshot, fetchedGenres;
      return regeneratorRuntime.async(function fetchGenres$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _firestore.getDocs)((0, _firestore.collection)(db, "genres")));

            case 4:
              querySnapshot = _context.sent;
              fetchedGenres = querySnapshot.docs.map(function (doc) {
                return doc.data().name;
              });
              setGenres(fetchedGenres);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              setError(_context.t0);

            case 12:
              setLoading(false);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 9]]);
    };

    fetchGenres();
  }, []);
  return {
    genres: genres,
    loading: loading,
    error: error
  };
};

exports.useGenres = useGenres;