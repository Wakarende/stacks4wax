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

var useUserCollections = function useUserCollections() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      collections = _useState2[0],
      setCollections = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  var _useAuth = (0, _useAuth3.useAuth)(),
      user = _useAuth.user;

  var db = (0, _firestore.getFirestore)(_firebaseConfig.app);
  (0, _react.useEffect)(function () {
    if (user) {
      console.log("Fetching collections for user:", user.uid);
      setLoading(true);
      var collectionsRef = (0, _firestore.collection)(db, "collections");
      var userRef = (0, _firestore.doc)(db, "users", user.uid);
      var q = (0, _firestore.query)(collectionsRef, (0, _firestore.where)("user_id", "==", userRef));
      (0, _firestore.getDocs)(q).then(function (querySnapshot) {
        console.log("Documents fetched:", querySnapshot.docs.length);
        var userCollections = querySnapshot.docs.map(function (doc) {
          return _objectSpread({
            id: doc.id
          }, doc.data());
        });
        setCollections(userCollections);
        setLoading(false);
      })["catch"](function (err) {
        console.error("Error fetching user collections:", err);
        setError(err);
        setLoading(false);
      });
    } else {
      console.log("No user logged in or user data not available yet.");
    }
  }, [user, db]);
  return {
    collections: collections,
    loading: loading,
    error: error
  };
}; //Fetch vinyls for user


exports.useUserCollections = useUserCollections;

var useUserVinyls = function useUserVinyls() {
  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      vinyls = _useState8[0],
      setVinyls = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      loading = _useState10[0],
      setLoading = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      error = _useState12[0],
      setError = _useState12[1];

  var _useAuth2 = (0, _useAuth3.useAuth)(),
      user = _useAuth2.user;

  var db = (0, _firestore.getFirestore)(_firebaseConfig.app);
  (0, _react.useEffect)(function () {
    if (user) {
      console.log("Fetching vinyls for user:", user.uid);
      setLoading(true);
      var vinylsRef = (0, _firestore.collection)(db, "vinyls");
      var userRef = (0, _firestore.doc)(db, "users", user.uid);
      var q = (0, _firestore.query)(vinylsRef, (0, _firestore.where)("user_id", "==", userRef));
      (0, _firestore.getDocs)(q).then(function (querySnapshot) {
        console.log("Vinyls fetched:", querySnapshot.docs.length);
        var userVinyls = querySnapshot.docs.map(function (doc) {
          return _objectSpread({
            id: doc.id
          }, doc.data());
        });
        setVinyls(userVinyls);
        setLoading(false);
      })["catch"](function (err) {
        console.error("Error fetching user vinyls:", err);
        setError(err);
        setLoading(false);
      });
    } else {
      console.log("No user logged in or user data not available yet.");
    }
  }, [user, db]);
  return {
    vinyls: vinyls,
    loading: loading,
    error: error
  };
};

exports.useUserVinyls = useUserVinyls;