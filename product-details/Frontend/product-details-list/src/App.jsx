import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './index.css';  // Custom CSS file

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const searchTimeout = useRef(null);

  // Fetch products from the backend
  useEffect(() => {
    document.title = 'Products';
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // To test whether arrows will be displayed when more than 30 records appear
  // useEffect(() => {
  //   document.title = 'Products';
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/products');
  //       const apiProducts = response.data.products;

  //       // Create 50 additional mock products
  //       const additionalProducts = Array.from({ length: 50 }, (_, index) => ({
  //         id: apiProducts.length + index + 1,
  //         title: `Mock Product ${index + 1}`,
  //         price: (Math.random() * 100).toFixed(2),
  //       }));

  //       // Combine API data with mock data
  //       const combinedProducts = [...apiProducts, ...additionalProducts];
  //       setProducts(combinedProducts);
  //     } catch (error) {
  //       console.error('Failed to fetch products:', error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  // Custom debounce function for search
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Clear selected rows and uncheck the "Select All" checkbox
    setSelectedRows([]);
    setSelectAllChecked(false);

    // Clear the previous timeout if the user is still typing
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Reset to the first page whenever a new search is initiated
    setCurrentPage(1);

    // Set a new timeout to trigger search only after 300ms
    searchTimeout.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAllChecked(false);  // Dynamically uncheck "Select All" if any row is unchecked
    } else {
      setSelectedRows([...selectedRows, id]);

      // Check if all rows on the current page are selected
      if (selectedRows.length + 1 === currentItems.length) {
        setSelectAllChecked(true);  // Dynamically check "Select All" if all rows are selected
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all rows on the current page
      setSelectedRows(currentItems.map(item => item.id));
      setSelectAllChecked(true);  // Check the "Select All" checkbox
    } else {
      setSelectedRows([]);
      setSelectAllChecked(false); // Uncheck the "Select All" checkbox
    }
  };

  // Handle row deletion (in memory)
  const handleDeleteSelectedRows = () => {
    if(selectedRows.length === 0) {
      alert("Please select atleast one product!");
      return;
    }
    
    const remainingProducts = products.filter(product => !selectedRows.includes(product.id));
    setProducts(remainingProducts);
    setSelectedRows([]);
    setSelectAllChecked(false);  // Uncheck "Select All" after deletion

    // Check if the current page is empty after deletion
    const totalPagesAfterDeletion = Math.ceil(remainingProducts.length / ITEMS_PER_PAGE);
    if (currentPage > totalPagesAfterDeletion && currentPage > 1) {
      // If the current page has no data and is not the first page, navigate to the previous page
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page navigation and uncheck "Select All" on page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);  // Clear selected rows on page change
    setSelectAllChecked(false);  // Uncheck "Select All" on page change
  };

  // Pagination controls
  const getPaginationNumbers = () => {
    const maxPagesToShow = 3;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    return Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);
  };

  return (
    <div className="container">
      <h1>List of Products</h1>

      <div className='search-container'>
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleInputChange} // Handle input change with custom debounce
          className="search-bar"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="select-all">
          <input
            type="checkbox"
            checked={selectAllChecked}
            onChange={handleSelectAll}
          /> Select All
        </div>

        <p className="selected-count">{selectedRows.length} rows selected</p>

        <div>
          <button
            onClick={handleDeleteSelectedRows}
          >
            Delete Selected
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Price</th>
            <th>Brand</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id} className={selectedRows.includes(product.id) ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(product.id)}
                  onChange={() => handleSelectRow(product.id)}
                />
              </td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {/* Only show arrows if there are more than 30 products */}
        {filteredProducts.length > 30 && currentPage > 1 && (
          <button style={{ backgroundColor: '#6d6e6d' }} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
        )}

        {getPaginationNumbers().map(page => (
          <button
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Only show arrows if there are more than 30 products */}
        {filteredProducts.length > 30 && currentPage < totalPages && (
          <button style={{ backgroundColor: '#6d6e6d' }} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
        )}
      </div>
    </div>
  );
};

export default App;