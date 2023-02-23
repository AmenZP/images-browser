import { useState } from "react";
import { useFormik } from "formik";
import "./header.css";
import "./content.css";
import "./article.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  console.log({ photos });
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
        {
          headers: {
            Authorization:
              "Client-ID MhFP9wONfqpt9qLfWgqtddnBHueeDVvK1ZnehNV8GlU",
          },
        }
      );
      const data = await response.json();
      setPhotos(data.results);
      console.log(" data  ", data.results);
    },
  });

  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <form onSubmit={formik.handleSubmit}>
          <input type="text" {...formik.getFieldProps("search")} />
        </form>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img alt={photo.alt_description} src={photo.urls.regular} />
              <p> {[photo.description, photo.alt_description].join(" - ")} </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
