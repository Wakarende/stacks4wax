"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVinyls = void 0;

var _react = require("react");

var _firestore = require("firebase/firestore");

var _firebaseConfig = require("../../utils/firebaseConfig");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useVinyls = function useVinyls(genre, searchTerm) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      vinyls = _useState2[0],
      setVinyls = _useState2[1];

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
    console.log("Fetching vinyls for genre: ".concat(genre));
    setLoading(true);

    var fetchVinyls = function fetchVinyls() {
      var q, conditions, querySnapshot, vinylsData;
      return regeneratorRuntime.async(function fetchVinyls$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              q = (0, _firestore.query)((0, _firestore.collection)(db, "vinyls"));
              conditions = [];

              if (genre) {
                conditions.push((0, _firestore.where)("genre", "==", genre));
              }

              if (searchTerm && searchTerm.trim() !== "") {
                // Assuming the search is case insensitive and partial matches are allowed
                conditions.push((0, _firestore.where)("title", ">=", searchTerm));
                conditions.push((0, _firestore.where)("title", "<=", searchTerm + "\uF8FF"));
              }

              if (conditions.length > 0) {
                q = _firestore.query.apply(void 0, [q].concat(conditions));
              }

              _context.next = 8;
              return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

            case 8:
              querySnapshot = _context.sent;
              vinylsData = querySnapshot.docs.map(function (doc) {
                var vinylData = doc.data();
                return {
                  id: doc.id,
                  title: vinylData.title,
                  image: vinylData.image,
                  artist: vinylData.artist // Assuming 'artist' is a simple field in your vinyls documents

                };
              });
              setVinyls(vinylsData);
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              setError(_context.t0);

            case 16:
              setLoading(false);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 13]]);
    };

    fetchVinyls();
  }, [db, genre]);
  return {
    vinyls: vinyls,
    loading: loading,
    error: error
  };
};

exports.useVinyls = useVinyls;