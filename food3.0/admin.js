document.addEventListener('DOMContentLoaded', function() {
  // Load menu items from localStorage
  let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
  let currentCategory = 'all';
  let currentSearchTerm = '';
  let currentEditItemId = null;

  // DOM elements
  const menuGrid = document.getElementById('menuGrid');
  const addItemBtn = document.getElementById('addItemBtn');
  const addItemForm = document.getElementById('addItemForm');
  const menuItemForm = document.getElementById('menuItemForm');
  const cancelBtn = document.getElementById('cancelBtn');
  const categoryLinks = document.querySelectorAll('.admin-nav a');
  const editModal = document.getElementById('editModal');
  const editItemForm = document.getElementById('editItemForm');
  const editCancelBtn = document.getElementById('editCancelBtn');
  const modalClose = document.querySelector('.modal-close');
  const searchInput = document.getElementById('searchAdmin');

  // Display menu items
  displayMenuItems();

  // Add event listener to search input
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearchTerm = this.value.toLowerCase().trim();
      displayMenuItems();
    });
  }

  // Add event listeners for category filtering
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Remove active class from all links
      categoryLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
      // Set current category and display filtered items
      currentCategory = this.getAttribute('data-category');
      displayMenuItems();
    });
  });

  // Toggle add item form
  addItemBtn.addEventListener('click', function() {
    if (addItemForm.style.display === 'none' || !addItemForm.style.display) {
      addItemForm.style.display = 'block';
      // Reset form
      menuItemForm.reset();
      document.getElementById('itemId').value = '';
    } else {
      addItemForm.style.display = 'none';
    }
  });

  // Cancel add item form
  cancelBtn.addEventListener('click', function() {
    addItemForm.style.display = 'none';
    menuItemForm.reset();
  });

  // Handle form submission for adding/editing items
  menuItemForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const itemId = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;
    const category = document.getElementById('itemCategory').value;
    const image = document.getElementById('itemImage').value;

    if (itemId) {
      // Edit existing item
      const index = menuItems.findIndex(item => item.id === parseInt(itemId));
      if (index !== -1) {
        menuItems[index] = {
          ...menuItems[index],
          name,
          description,
          category,
          image
        };
      }
    } else {
      // Add new item
      const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
      menuItems.push({
        id: newId,
        name,
        description,
        category,
        image
      });
    }

    // Save to localStorage and refresh display
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    displayMenuItems();

    // Reset and hide form
    menuItemForm.reset();
    addItemForm.style.display = 'none';
  });

  // Handle edit modal close
  modalClose.addEventListener('click', function() {
    editModal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === editModal) {
      editModal.style.display = 'none';
    }
  });

  // Cancel edit form
  editCancelBtn.addEventListener('click', function() {
    editModal.style.display = 'none';
  });

  // Handle edit form submission
  editItemForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const itemId = parseInt(document.getElementById('editItemId').value);
    const name = document.getElementById('editItemName').value;
    const description = document.getElementById('editItemDescription').value;
    const category = document.getElementById('editItemCategory').value;
    const image = document.getElementById('editItemImage').value;

    // Update item
    const index = menuItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      menuItems[index] = {
        ...menuItems[index],
        name,
        description,
        category,
        image
      };

      // Save to localStorage and refresh display
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
      displayMenuItems();

      // Close modal
      editModal.style.display = 'none';
    }
  });

  // Function to display menu items based on selected category and search term
  function displayMenuItems() {
    // Clear menu grid
    menuGrid.innerHTML = '';

    // Filter items by category if not 'all'
    let filteredItems = currentCategory === 'all' ?
      menuItems :
      menuItems.filter(item => item.category === currentCategory);

    // Apply search filter if search term exists
    if (currentSearchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(currentSearchTerm) ||
        item.description.toLowerCase().includes(currentSearchTerm) ||
        getCategoryName(item.category).toLowerCase().includes(currentSearchTerm)
      );
    }

    // Display items
    filteredItems.forEach(item => {
      const menuCard = document.createElement('div');
      menuCard.className = 'menu-card';
      menuCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-card-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="category-badge">${getCategoryName(item.category)}</div>
          <div class="actions">
            <button class="btn-edit" data-id="${item.id}">Edit</button>
            <button class="btn-delete" data-id="${item.id}">Delete</button>
          </div>
        </div>
      `;
      menuGrid.appendChild(menuCard);
    });

    // If no items match the category/search
    if (filteredItems.length === 0) {
      menuGrid.innerHTML = '<p>No items found matching your criteria.</p>';
    }

    // Add event listeners for edit and delete buttons
    addActionButtonListeners();
  }

  // Add event listeners to edit and delete buttons
  function addActionButtonListeners() {
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemId = parseInt(this.getAttribute('data-id'));
        openEditModal(itemId);
      });
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const itemId = parseInt(this.getAttribute('data-id'));
        if (confirm('Are you sure you want to delete this item?')) {
          deleteMenuItem(itemId);
        }
      });
    });
  }

  // Open edit modal and populate form
  function openEditModal(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      document.getElementById('editItemId').value = item.id;
      document.getElementById('editItemName').value = item.name;
      document.getElementById('editItemDescription').value = item.description;
      document.getElementById('editItemCategory').value = item.category;
      document.getElementById('editItemImage').value = item.image;

      // Show modal
      editModal.style.display = 'flex';
    }
  }

  // Delete menu item
  function deleteMenuItem(itemId) {
    menuItems = menuItems.filter(item => item.id !== itemId);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    displayMenuItems();
  }

  // Helper function to get category display name
  function getCategoryName(category) {
    const categoryNames = {
      'appetizers': 'Appetizers',
      'main': 'Main Courses',
      'desserts': 'Desserts',
      'drinks': 'Drinks'
    };
    return categoryNames[category] || category;
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Get menu items from localStorage
  let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

  // Display menu items in admin panel
  displayAdminMenuItems();

  // Add event listener to admin category links
  const adminCategoryLinks = document.querySelectorAll('.admin-nav a');
  adminCategoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      adminCategoryLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Filter menu items by category
      const category = this.getAttribute('data-category');
      displayAdminMenuItems(category);
    });
  });

  // Add event listener to search input
  const searchInput = document.getElementById('searchAdmin');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const activeCategory = document.querySelector('.admin-nav a.active').getAttribute('data-category');
      displayAdminMenuItems(activeCategory, searchTerm);
    });
  }

  // Add event listener to "Add New Item" button
  const addItemBtn = document.getElementById('addItemBtn');
  const addItemForm = document.getElementById('addItemForm');
  const cancelAddItemBtn = document.getElementById('cancelAddItem');
  const menuItemForm = document.getElementById('menuItemForm');

  if (addItemBtn) {
    addItemBtn.addEventListener('click', function() {
      addItemForm.style.display = 'block';
    });
  }

  if (cancelAddItemBtn) {
    cancelAddItemBtn.addEventListener('click', function() {
      addItemForm.style.display = 'none';
      menuItemForm.reset();
    });
  }

  // Add event listener to menu item form
  if (menuItemForm) {
    menuItemForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('itemName').value;
      const description = document.getElementById('itemDescription').value;
      const price = parseFloat(document.getElementById('itemPrice').value);
      const category = document.getElementById('itemCategory').value;
      const image = document.getElementById('itemImage').value;
      
      // Create new item object
      const newItem = {
        id: Date.now(), // Use timestamp as unique ID
        name,
        description,
        price,
        category,
        image
      };
      
      // Add new item to menuItems array
      menuItems.push(newItem);
      
      // Save to localStorage
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
      
      // Update display
      displayAdminMenuItems();
      
      // Reset form and hide
      menuItemForm.reset();
      addItemForm.style.display = 'none';
      
      // Show success message
      alert('New menu item added successfully!');
    });
  }

  // Set up edit modal elements
  const editModal = document.getElementById('editModal');
  const closeEditModal = document.getElementById('closeEditModal');
  const cancelEditItemBtn = document.getElementById('cancelEditItem');
  const editItemForm = document.getElementById('editItemForm');

  // Edit modal close button event
  if (closeEditModal) {
    closeEditModal.addEventListener('click', function() {
      editModal.style.display = 'none';
    });
  }

  // Cancel edit button event
  if (cancelEditItemBtn) {
    cancelEditItemBtn.addEventListener('click', function() {
      editModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === editModal) {
      editModal.style.display = 'none';
    }
  });

  // Edit item form submit event
  if (editItemForm) {
    editItemForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const id = parseInt(document.getElementById('editItemId').value);
      const name = document.getElementById('editItemName').value;
      const description = document.getElementById('editItemDescription').value;
      const price = parseFloat(document.getElementById('editItemPrice').value);
      const category = document.getElementById('editItemCategory').value;
      const image = document.getElementById('editItemImage').value;
      
      // Find item index
      const itemIndex = menuItems.findIndex(item => item.id === id);
      
      if (itemIndex !== -1) {
        // Update item
        menuItems[itemIndex] = {
          id,
          name,
          description,
          price,
          category,
          image
        };
        
        // Save to localStorage
        localStorage.setItem('menuItems', JSON.stringify(menuItems));
        
        // Update display
        displayAdminMenuItems();
        
        // Close modal
        editModal.style.display = 'none';
        
        // Show success message
        alert('Menu item updated successfully!');
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav ul');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
});

// Function to display menu items in admin panel
function displayAdminMenuItems(category = 'all', searchTerm = '') {
  const adminMenuItems = document.getElementById('adminMenuItems');
  if (!adminMenuItems) return;

  // Clear container
  adminMenuItems.innerHTML = '';

  // Get menu items from localStorage
  const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

  // Filter items by category if specified
  let filteredItems = category === 'all' ? 
    menuItems : 
    menuItems.filter(item => item.category === category);

  // Apply search filter if search term exists
  if (searchTerm) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  // Display items
  filteredItems.forEach(item => {
    const menuCard = document.createElement('div');
    menuCard.className = 'menu-card';
    menuCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-card-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price">$${item.price.toFixed(2)}</div>
        <div class="actions">
          <button class="btn-edit" data-id="${item.id}">Edit</button>
          <button class="btn-delete" data-id="${item.id}">Delete</button>
        </div>
      </div>
    `;
    adminMenuItems.appendChild(menuCard);
  });

  // If no items match the category/search
  if (filteredItems.length === 0) {
    adminMenuItems.innerHTML = '<p class="no-items">No items found matching your criteria.</p>';
  }

  // Add event listeners to edit and delete buttons
  addAdminButtonListeners();
}

// Add event listeners to admin buttons
function addAdminButtonListeners() {
  // Edit buttons
  const editButtons = document.querySelectorAll('.btn-edit');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = parseInt(this.getAttribute('data-id'));
      openEditModal(itemId);
    });
  });

  // Delete buttons
  const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemId = parseInt(this.getAttribute('data-id'));
      deleteMenuItem(itemId);
    });
  });
}

// Open edit modal with item data
function openEditModal(itemId) {
  // Get menu items from localStorage
  const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

  // Find the item
  const item = menuItems.find(item => item.id === itemId);

  if (item) {
    // Populate form fields
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemDescription').value = item.description;
    document.getElementById('editItemPrice').value = item.price;
    document.getElementById('editItemCategory').value = item.category;
    document.getElementById('editItemImage').value = item.image;

    // Show modal
    document.getElementById('editModal').style.display = 'flex';
  }
}

// Delete menu item
function deleteMenuItem(itemId) {
  // Confirm deletion
  if (confirm('Are you sure you want to delete this menu item?')) {
    // Get menu items from localStorage
    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

    // Filter out the item to delete
    menuItems = menuItems.filter(item => item.id !== itemId);

    // Save to localStorage
    localStorage.setItem('menuItems', JSON.stringify(menuItems));

    // Update display
    displayAdminMenuItems();

    // Show success message
    alert('Menu item deleted successfully!');
  }
}
