import { useState } from "react";
import { useFormik } from "formik";
import Footer from "./components/Footer";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "./header.css";
import "./content.css";
import "./article.css";

const getPhotos = async (values) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
    {
      headers: {
        Authorization: "Client-ID MhFP9wONfqpt9qLfWgqtddnBHueeDVvK1ZnehNV8GlU",
      },
    }
  );
  const data = await response.json();
  console.log("data", data.results);
  return data.results;
};

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);

  const formik = useFormik({
    initialValues: {
      search: "",
    },

    onSubmit: (values) => handlerSubmit(values),
  });

  const handlerSubmit = async (values) => {
    setIsLoading(!isLoading);
    const newPhotos = await getPhotos(values);
    console.log("newphotos", newPhotos);
    if (newPhotos.length) {
      setPhotos(newPhotos);
    } else {
      setPhotos([]);
      setError("No hay datos");
    }
    setIsLoading(false);
  };

  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <div className="header-container">
          <form onSubmit={formik.handleSubmit}>
            <input type="text" {...formik.getFieldProps("search")} />
          </form>
        </div>
      </header>
      <div
        className={`container ${photos.length ? "padding-container" : null}`}
      >
        <div className="center">
          {!isLoading
            ? photos.map((photo) => (
                <article key={photo.id} onClick={() => open(photo.links.html)}>
                  <img alt={photo.alt_description} src={photo.urls.regular} />
                  <p>
                    {" "}
                    {[photo.description, photo.alt_description].join(
                      " - "
                    )} ){" "}
                  </p>
                </article>
              ))
            : Array.from({ length: 6 }).map((_) => (
                <Skeleton
                  className="skeleton"
                  baseColor="#afafaf"
                  variant="rectangular"
                  width={370}
                  height={250}
                />
              ))}
          <div> {error} </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
