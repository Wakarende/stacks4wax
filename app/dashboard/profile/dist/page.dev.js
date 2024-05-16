"use strict";
"use client";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _navigation = require("next/navigation");

var _profileHeader = _interopRequireDefault(require("@/app/components/profile/profileHeader"));

var _profileTabs = _interopRequireDefault(require("@/app/components/profile/profileTabs"));

var _protectedLayout = _interopRequireDefault(require("./protected-layout"));

var _useAuth = require("../../hooks/useAuth");

var _vinylcard = _interopRequireDefault(require("@/app/ui/vinyls/vinylcard"));

var _io = require("react-icons/io");

var _useUserCollectionsAndVinyls = require("../../hooks/useUserCollectionsAndVinyls.js");

var _link = _interopRequireDefault(require("next/link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const UserProfilePage = () => {
//   //debugging
//   console.log("useAuth hook called");
//   const { user, loading } = useAuth();
//   //debugging
//   console.log("useRouter hook called");
//   const router = useRouter();
//   //debugging
//   console.log("User in UserProfilePage:", user);
//   console.log("Loading state in UserProfilePage:", loading);
//   console.log("useEffect hook called");
//   useEffect(() => {
//     if (!loading && !user) {
//       console.log("User is not authenticated, redirecting...");
//       router.push("/dashboard/login"); // Make sure this path is correct
//     }
//   }, [user, loading, router]);
//   const { collections, error } = useUserCollections();
//   const { vinyls } = useUserVinyls();
//   if (!user) {
//     return <div>Redirecting to login...</div>;
//   }
//   //Profile tabs
//   const [activeTab, setActiveTab] = useState("Collections"); // Default active tab
//   const handleSelectTab = (tabName) => {
//     setActiveTab(tabName);
//   };
//   return (
//     <ProtectedLayout>
//       <div className="container mx-auto my-8">
//         <ProfileHeader />
//         <ProfileTabs onSelectTab={handleSelectTab} activeTab={activeTab} />
//         <div className="py-4">
//           {activeTab === "Collections" && (
//             <div>
//               <div className="flex items-center mb-2">
//                 <IoIosAddCircleOutline />
//                 <Link
//                   href={"/dashboard/profile/createcollection"}
//                   className="mx-1"
//                 >
//                   Create new collection
//                 </Link>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
//                 {collections.map((col) => (
//                   <AlbumCard
//                     id={col.id} // It's better to use unique IDs than index for keys
//                     title={col.name}
//                     image={col.cover_image}
//                     link={`/dashboard/profile/singlecollection/${col.id}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//           {activeTab === "Vinyls" && (
//             <div>
//               <div className="flex items-center mb-2">
//                 <IoIosAddCircleOutline />
//                 <Link href={"/dashboard/profile/addvinyl"} className="mx-1">
//                   Add Vinyl
//                 </Link>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
//                 {vinyls.map((vinyl) => (
//                   <AlbumCard
//                     id={vinyl.id}
//                     key={vinyl.id} // It's better to use unique IDs than index for keys
//                     title={vinyl.title}
//                     artist={vinyl.artist.name}
//                     image={vinyl.image}
//                     link={`/dashboard/singlevinyl/${vinyl.id}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//           {activeTab === "Likes" && <div>Likes content...</div>}
//         </div>
//       </div>
//     </ProtectedLayout>
//   );
// };
var _default = UserProfilePage;
exports["default"] = _default;