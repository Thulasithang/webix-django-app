const data = webix.ajax("https://dummyjson.com/products").then((response) => {
  const products = response.json().products; // Extract "products" array

  return {
    view: "datatable",
    id: "film_table",
    autoConfig: true,
    responsive: "top",
    // autoheight: true,
    scrollX: true, // Enable horizontal scrolling
    scrollY: true,
	scroll: true,
    css: "webix_shadow_medium",
    editable: true,
    columns: [
      { id: "id", header: "ID", width: 50 },
      { id: "title", header: "Title", width: 250 },
      { id: "description", header: "Description", width: 300 },
      { id: "price", header: "Price ($)", width: 100 },
      { id: "brand", header: "Brand", width: 100 },
      { id: "category", header: "Category", width: 120 },
    ],
    data: products, // Load data into the table
  };
});
export default data;
