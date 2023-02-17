import { Formik, Form, Field } from "formik";
const App = () => {
  return (
    <div>
      <header>
        <Formik
          initalValues={{ search: "" }}
          onSubmit={async (values) => {
            console.log(values);
          }}
        ></Formik>
      </header>
    </div>
  );
};

export default App;
