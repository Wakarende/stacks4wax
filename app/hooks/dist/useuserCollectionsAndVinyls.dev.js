"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserVinyls = exports.useUserCollections = void 0;

var _react = require("react");

var _firestore = require("firebase/firestore");

var _useAuth3 = require("./useAuth");

var _firebaseConfig = require("../../utils/firebaseConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//fetch collections for logged in user
var useUserCollections = function useUserCollections() {
  var _useAuth = (0, _useAuth3.useAuth)(),
      user = _useAuth.user;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      collections = _useState2[0],
      setCollections = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var db = (0, _firestore.getFirestore)(_firebaseConfig.app);
  (0, _react.useEffect)(function () {
    if (!user) return;

    var fetchCollections = function fetchCollections() {
      var collectionsRef, collectionsSnapshot, collectionsData;
      return regeneratorRuntime.async(function fetchCollections$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              collectionsRef = (0, _firestore.collection)(db, "users/".concat(user.uid, "/collections"));
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _firestore.getDocs)(collectionsRef));

            case 4:
              collectionsSnapshot = _context.sent;
              collectionsData = collectionsSnapshot.docs.map(function (doc) {
                return _objectSpread({
                  id: doc.id
                }, doc.data());
              });
              console.log("Fetched collections:", collectionsData);
              setCollections(collectionsData);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error("Error fetching collections:", _context.t0);
              setError(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 10]]);
    };

    fetchCollections();
  }, [user, db]);
  return {
    collections: collections,
    error: error
  };
}; //Fetch vinyls for logged in user


exports.useUserCollections = useUserCollections;

var useUserVinyls = function useUserVinyls() {
  var _useAuth2 = (0, _useAuth3.useAuth)(),
      user = _useAuth2.user;

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      vinyls = _useState6[0],
      setVinyls = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  var db = (0, _firestore.getFirestore)(_firebaseConfig.app);
  (0, _react.useEffect)(function () {
    if (!user) return;

    var fetchUserVinyls = function fetchUserVinyls() {
      var collectionsRef, collectionsSnapshot, collectionIds, vinylPromises, vinylsArray, userVinyls;
      return regeneratorRuntime.async(function fetchUserVinyls$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setLoading(true);
              _context3.prev = 1;
              collectionsRef = (0, _firestore.collection)(db, "users/".concat(user.uid, "/collections"));
              _context3.next = 5;
              return regeneratorRuntime.awrap((0, _firestore.getDocs)(collectionsRef));

            case 5:
              collectionsSnapshot = _context3.sent;
              collectionIds = collectionsSnapshot.docs.map(function (doc) {
                return doc.id;
              });
              vinylPromises = collectionIds.map(function _callee(collectionId) {
                var vinylsRef, vinylsSnapshot;
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        vinylsRef = (0, _firestore.collection)(db, "users/".concat(user.uid, "/collections/").concat(collectionId, "/vinyls"));
                        _context2.next = 3;
                        return regeneratorRuntime.awrap((0, _firestore.getDocs)(vinylsRef));

                      case 3:
                        vinylsSnapshot = _context2.sent;
                        return _context2.abrupt("return", vinylsSnapshot.docs.map(function (doc) {
                          return _objectSpread({
                            id: doc.id
                          }, doc.data());
                        }));

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              });
              _context3.next = 10;
              return regeneratorRuntime.awrap(Promise.all(vinylPromises));

            case 10:
              vinylsArray = _context3.sent;
              userVinyls = vinylsArray.flat();
              setVinyls(userVinyls);
              _context3.next = 19;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](1);
              console.error("Error fetching user vinyls:", _context3.t0);
              setError(_context3.t0);

            case 19:
              _context3.prev = 19;
              setLoading(false);
              return _context3.finish(19);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 15, 19, 22]]);
    };

    fetchUserVinyls();
  }, [user, db]);
  return {
    vinyls: vinyls,
    loading: loading,
    error: error
  };
};

exports.useUserVinyls = useUserVinyls;