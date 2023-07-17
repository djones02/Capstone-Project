import {redirect} from "react-router-dom";

export async function getCurrentUser() {
    return fetch('/api/@me')
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .catch(error => setErrors(error))
}

export async function createUser(values) {
    return fetch('/api/signup', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(newUser => {
            return newUser
        })
}

export async function getUsers(page = 1) {
    return fetch(`/api/users?page=${page}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function getUserById(id) {
    return fetch(`/api/users/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function updateUser(id, values) {
    return fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)
    })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .catch(error => setErrors(error))
}

export async function deleteUser(id) {
    return fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
}

export async function getListings(page = 1) {
    return fetch(`/api/listings?page=${page}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function addListing(values) {
    return fetch(`/api/listings` , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(new_listing => {
            return new_listing
        })
}

export async function getListingById(id) {
    return fetch(`/api/listings/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => setErrors(error))
}

export async function updateListing(id, values) {
    return fetch(`/api/listings/${id}` , {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch(error => setErrors(error))
}

export async function deleteListing(id) {
    return fetch(`/api/listings/${id}` , {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (response.ok) {
                return redirect("/listings")
            }
        })
        .catch(error => setErrors(error))
}

export async function getCarts() {
    return fetch(`/api/carts`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function addCart(values) {
    return fetch(`/api/carts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(newCart => {
            return newCart
        })
}

export async function getCartById(id) {
    return fetch(`/api/carts/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function deleteCart(id) {
    return fetch(`/api/carts/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })
}

export async function getCartedItems(cartId) {
    return fetch(`/api/carted_items`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function addCartedItem(values) {
    return fetch(`/api/carted_items`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(newCartedItem => {
            return newCartedItem
        })
}

export async function getCartedItemById(id) {
    return fetch(`/api/carted_items/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function updateCartedItem(id, values) {
    return fetch(`/api/carted_items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function deleteCartedItem(id) {
    return fetch(`/api/carted_items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
}

export async function getOrders() {
    return fetch(`/api/orders`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function addOrder(userId) {
    const values = {user_id: userId}
    return fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    })
        .then(response => response.json())
        .then(newOrder=> {
            return newOrder
        })
}

export async function getOrderById(id) {
    return fetch(`/api/orders/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function deleteOrder(id) {
    return fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
}

export async function getOrderItems() {
    return fetch(`/api/order_items`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function addOrderItem(listing_id, amount) {
    const values = {listing_id: listing_id, amount: amount}
    return fetch(`/api/order_items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    }) 
        .then(response => response.json())
        .then(newOrderItem => {
            return newOrderItem
        })
}

export async function getOrderItemById(id) {
    return fetch(`/api/order_items/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function updateOrderItem(id, values) {
    return fetch(`/api/order_items/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values)
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function deleteOrderItem(id) {
    return fetch(`/api/order_items/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    })
}

export async function filteredOrderItems() {
    return fetch("/api/filtered_order_items")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => {
            setErrors(error)
            return []
        })
}

export async function filteredListings(id) {
    return fetch(`/api/filtered_listings/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => {
            setErrors(error)
            return []
        })
}

export async function searchListings(search) {
    return await fetch(`/api/search/${search}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}

export async function searchUsers(search) {
    return await fetch(`/api/search_users/${search}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => setErrors(error))
}