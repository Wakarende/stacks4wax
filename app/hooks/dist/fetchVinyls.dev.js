"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVinyls = void 0;

var _react = require("react");

var _firestore = require("firebase/firestore");

var _firebaseConfig = require("../../utils/firebaseConfig");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var usersRef, usersSnapshot, userIds, vinylPromises, allVinylsArray, allVinyls;
      return regeneratorRuntime.async(function fetchVinyls$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              usersRef = (0, _firestore.collection)(db, "users");
              _context3.next = 4;
              return regeneratorRuntime.awrap((0, _firestore.getDocs)(usersRef));

            case 4:
              usersSnapshot = _context3.sent;
              userIds = usersSnapshot.docs.map(function (doc) {
                return doc.id;
              });
              vinylPromises = userIds.map(function _callee2(userId) {
                var collectionsRef, collectionsSnapshot, collectionIds, vinylCollectionPromises, vinylsArray;
                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        collectionsRef = (0, _firestore.collection)(db, "users/".concat(userId, "/collections"));
                        _context2.next = 3;
                        return regeneratorRuntime.awrap((0, _firestore.getDocs)(collectionsRef));

                      case 3:
                        collectionsSnapshot = _context2.sent;
                        collectionIds = collectionsSnapshot.docs.map(function (doc) {
                          return doc.id;
                        });
                        vinylCollectionPromises = collectionIds.map(function _callee(collectionId) {
                          var vinylsRef, q, conditions, vinylsSnapshot;
                          return regeneratorRuntime.async(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  vinylsRef = (0, _firestore.collection)(db, "users/".concat(userId, "/collections/").concat(collectionId, "/vinyls"));
                                  q = vinylsRef;
                                  conditions = [];

                                  if (genre) {
                                    conditions.push(where("genre", "==", genre));
                                  }

                                  if (searchTerm && searchTerm.trim() !== "") {
                                    // Assuming the search is case insensitive and partial matches are allowed
                                    conditions.push(where("title", ">=", searchTerm));
                                    conditions.push(where("title", "<=", searchTerm + "\uF8FF"));
                                  }

                                  if (conditions.length > 0) {
                                    q = query.apply(void 0, [vinylsRef].concat(conditions));
                                  }

                                  _context.next = 8;
                                  return regeneratorRuntime.awrap((0, _firestore.getDocs)(q));

                                case 8:
                                  vinylsSnapshot = _context.sent;
                                  return _context.abrupt("return", vinylsSnapshot.docs.map(function (doc) {
                                    return _objectSpread({
                                      id: doc.id
                                    }, doc.data());
                                  }));

                                case 10:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          });
                        });
                        _context2.next = 8;
                        return regeneratorRuntime.awrap(Promise.all(vinylCollectionPromises));

                      case 8:
                        vinylsArray = _context2.sent;
                        return _context2.abrupt("return", vinylsArray.flat());

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              });
              _context3.next = 9;
              return regeneratorRuntime.awrap(Promise.all(vinylPromises));

            case 9:
              allVinylsArray = _context3.sent;
              allVinyls = allVinylsArray.flat();
              setVinyls(allVinyls);
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              setError(_context3.t0);

            case 17:
              setLoading(false);

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 14]]);
    };

    fetchVinyls();
  }, [db, genre, searchTerm]);
  return {
    vinyls: vinyls,
    loading: loading,
    error: error
  };
};

exports.useVinyls = useVinyls;