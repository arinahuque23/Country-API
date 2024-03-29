import { useEffect, useState } from "react";

const Country = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    region: "",
    city: "",
  });
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("/countryapi.json")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("data fetch hoi nai", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const selectedCountryData = countries.find(
      ({ name }) => name === selectedCountry
    ) || { regions: [] };

    setFormData({
      ...formData,
      country: selectedCountry,
      region: "",
      city: "",
    });
    setRegions(selectedCountryData.regions);
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    const { country } = formData;

    const region = countries
      .find(({ name }) => name === country)
      ?.regions.find(({ name }) => name === selectedRegion);

    setFormData({ ...formData, region: selectedRegion, city: "" });
    setCities(region?.cities || []);
  };

  const handleSubmit = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("ei tmr data", formData);
  };

  return (
    <div className="mt-20">
      <div>
        <div className="container mx-auto max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="region"
              >
                Region
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleRegionChange}
              >
                <option value="">Select Region</option>
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Country;
