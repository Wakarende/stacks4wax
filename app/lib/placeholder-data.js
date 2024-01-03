const bcrypt = require("bcrypt");

// Example Users
const users = [
  {
    id: "uuid-user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("johnsPassword123", 10),
  },
  {
    id: "uuid-user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: bcrypt.hashSync("janesPassword456", 10),
  },
  {
    id: "uuid-user-3",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    password: bcrypt.hashSync("alexsPassword789", 10),
  },
];

// Example Vinyls
const vinyls = [
  {
    id: "uuid-vinyl-1",
    title: "Pink Friday 2",
    artist_id: "uuid-artist-1",
    release_year: 2023,
    cover_image_url: "../../public/vinyls/PinkFriday2.jpg",
    genre: "uuid-genre-1 ",
    user_id: "uuid-user-1",
  },
  {
    id: "uuid-vinyl-2",
    title: "Call Me If You Get Lost",
    artist_id: "uuid-artist-2",
    release_year: 2021,
    cover_image_url: "../../public/vinyls/TylerTheCreator.jpg",
    subgenre1_id: "uuid-genre-3",
    subgenre2_id: "uuid-genre-4",
    user_id: "uuid-user-2",
  },
  {
    id: "uuid-vinyl-3",
    title: "The Dark Si",
    artist_id: "uuid-artist-3",
    release_year: 1973,
    cover_image_url: "/images/vinyls/dark-side-of-the-moon.png",
    subgenre1_id: "uuid-genre-5",
    subgenre2_id: "uuid-genre-6",
    user_id: "uuid-user-3",
  },
  {
    id: "uuid-vinyl-4",
    title: "The Wall",
    artist_id: "uuid-artist-4",
    release_year: 1979,
    cover_image_url: "/images/vinyls/the-wall.png",
    subgenre1_id: "uuid-genre-7",
    subgenre2_id: "uuid-genre-8",
    user_id: "uuid-user-1",
  },
  {
    id: "uuid-vinyl-5",
    title: "Abbey Road",
    artist_id: "uuid-artist-5",
    release_year: 1969,
    cover_image_url: "/images/vinyls/abbey-road.png",
    subgenre1_id: "uuid-genre-9",
    subgenre2_id: "uuid-genre-10",
    user_id: "uuid-user-2",
  },
];

// Example Collections
const collections = [
  {
    id: "uuid-collection-1",
    collection_name: "Classic Rock Favorites",
    collection_description:
      "A selection of groundbreaking rock albums from the 70s and 80s.",
    user_id: "uuid-user-1", // assuming owned by the first user
    image: "/images/collections/classic-rock.png",
  },
  {
    id: "uuid-collection-2",
    collection_name: "Jazz Essentials",
    collection_description: "The must-have records for any jazz enthusiast.",
    user_id: "uuid-user-2", // assuming owned by the second user
    image: "/images/collections/jazz-essentials.png",
  },
  {
    id: "uuid-collection-3",
    collection_name: "Pop Hits",
    collection_description:
      "The most popular pop records from the 80s to today.",
    user_id: "uuid-user-3", // assuming owned by the third user
    image: "/images/collections/pop-hits.png",
  },
  {
    id: "uuid-collection-4",
    collection_name: "Soul and R&B",
    collection_description:
      "Soulful tunes and smooth R&B hits that stood the test of time.",
    user_id: "uuid-user-1", // assuming owned by the first user
    image: "/images/collections/soul-rnb.png",
  },
  {
    id: "uuid-collection-5",
    collection_name: "Hip Hop Evolution",
    collection_description:
      "Chronicles the history of hip hop from the streets to mainstream.",
    user_id: "uuid-user-2",
  },
];
