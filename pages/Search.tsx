// @ts-ignore
import { useRouter } from "next/router";
import { SetStateAction, useState, useEffect } from "react";
import internal from "stream";
const LastFM = require("last-fm");
const lastfm = new LastFM("6444395aab91bc170539e7312aaf7638", {
  userAgent: "QuarterNotes/1.0.0 (http://example.com)",
});

interface result {
  meta: {
    query: {};
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  result: [
    {
      type: string;
      name: string;
      artistName: string;
      duration: number;
      listeners: number;
    }
  ];
}

const Search = ({ userSearch }) => {
  const router = useRouter();

  const [searchResultNames, setSearchResultNames] = useState([]);
  const [searchResultArtists, setSearchResultArtists] = useState([]);
  const [searchResultImages, setSearchResultImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const callback = function (error, data: result) {
    if (error) console.error(error);
    else {
      let names = [],
        artists = [],
        images = [];
      for (var i = 0; i < data.result.length; i++) {
        names[i] = data.result[i].name;
        artists[i] = data.result[i].artistName;
        images[i] = data.result[i].images;
      }
      console.log(data.result[0]);
      setSearchResultNames(names);
      setSearchResultArtists(artists);
      setSearchResultImages(images);

      return data;
    }
  };
  console.log(router.query);
  lastfm.trackSearch({ q: userSearch.qry, limit: 5 }, callback);

  let searchResults = [];

  for (var i = 0; i < searchResultNames.length; i++) {
    searchResults[i] = {
      name: searchResultNames[i],
      artist: searchResultArtists[i],
      images: searchResultImages[i],
    };
  }
  return (
    <>
      {searchResults &&
        searchResults.length > 0 &&
        searchResults.map((result) => (
          <>
            <h1>{result.name}</h1>
            <h3>{result.artist}</h3>
            <img src={result.images && result.images[3]} />
          </>
        ))}
    </>
  );
};

export async function getServerSideProps(context) {
  const userSearch = context.query;

  // Pass data to the page via props
  return { props: { userSearch } };
}
export default Search;
