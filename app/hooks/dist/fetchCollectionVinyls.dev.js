"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCollectionVinyls = void 0;

var _react = require("react");

var _firestore = require("firebase/firestore");

var _useAuth2 = require("./useAuth");

var _firebaseConfig = require("../../utils/firebaseConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fetchCollectionVinyls = function fetchCollectionVinyls(collectionId) {
  var _useAuth = (0, _useAuth2.useAuth)(),
      user = _useAuth.user;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      vinyls = _useState2[0],
      setVinyls = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var db = (0, _firestore.getFirestore)(_firebaseConfig.app);
  (0, _react.useEffect)(function () {
    if (!user || !collectionId) return;

    var fetchVinyls = function fetchVinyls() {
      var vinylsRef, vinylsSnapshot, vinylsData;
      return regeneratorRuntime.async(function fetchVinyls$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              vinylsRef = (0, _firestore.collection)(db, "users/".concat(user.uid, "/collections/").concat(collectionId, "/vinyls"));
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _firestore.getDocs)(vinylsRef));

            case 4:
              vinylsSnapshot = _context.sent;
              vinylsData = vinylsSnapshot.docs.map(function (doc) {
                return _objectSpread({
                  id: doc.id
                }, doc.data());
              });
              console.log("Fetched vinyls:", vinylsData);
              setVinyls(vinylsData);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error("Error fetching vinyls:", _context.t0);
              setError(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 10]]);
    };

    fetchVinyls();
  }, [user, collectionId, db]);
  return {
    vinyls: vinyls,
    error: error
  };
};

exports.fetchCollectionVinyls = fetchCollectionVinyls;