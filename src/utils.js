const domain = "";

export const login = (credential) => {
    const loginUrl = `${domain}/authenticate`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in.");
        }
        return response.json();
    });
}

export const register = (credential) => {
    const registerUrl = `${domain}/register`;
    return fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to register.");
        }
    });
}

export const deleteItem = (itemId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteItemUrl = `${domain}/items/${itemId}`;

    return fetch(deleteItemUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to delete this item.");
        }
    });
}

export const editItem = (itemId, data) => {
    const authToken = localStorage.getItem("authToken");
    const editItemUrl = `${domain}/items/${itemId}`;
    
    return fetch(editItemUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.status !== 200) {
            console.log(response);
            throw Error("Fail to update the item.");
        }
    });
}

export const searchItems = (query={}) => {
    let searchItemUrl = `${domain}/search?`;
    searchItemUrl = searchItemUrl.concat("itemName=");
    if (query.itemName !== undefined) {
        searchItemUrl = searchItemUrl.concat(query.itemName);
    }
    searchItemUrl = searchItemUrl.concat("&itemDesc=");
    if (query.itemDesc !== undefined) {
        searchItemUrl = searchItemUrl.concat(query.itemDesc);
    }
    searchItemUrl = searchItemUrl.concat("&priceMin=");
    if (query.priceMin !== undefined) {
        searchItemUrl = searchItemUrl.concat(query.priceMin);
    }
    searchItemUrl = searchItemUrl.concat("&priceMax=");
    if (query.priceMax !== undefined) {
        searchItemUrl = searchItemUrl.concat(query.priceMax);
    }
    return fetch(searchItemUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to search.");
        }
        return response.json();
    });
}

export const getMyItems = (value = "") => {
    const authToken = localStorage.getItem("authToken");
    const getItemUrl = `${domain}/items/${value}`;

    return fetch(getItemUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get my items.");
        }
        return response.json();
    });
}

export const askItem = (itemId) => {
    const authToken = localStorage.getItem("authToken");
    const askUrl = `${domain}/ask/${itemId}`;

    return fetch(askUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status === 403) {
            throw Error("Cannot ask your own item.");
        } else if (response.status !== 200) {
            throw Error("Fail to ask this item.");
        }
    });
}

export const markSold = (itemId) => {
    const authToken = localStorage.getItem("authToken");
    const markSoldUrl = `${domain}/sold/${itemId}`;

    return fetch(markSoldUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer  ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to mark item as sold.");
        }
    });
}

export const getUserProfile = () => {
    const authToken = localStorage.getItem("authToken");
    const getProfileUrl = `${domain}/user/`;

    return fetch(getProfileUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to retrive user profile.");
        }
        return response.json();
    });
}

export const updateUser = (data) => {
    const authToken = localStorage.getItem("authToken");
    const updateUserUrl = `${domain}/user/`;

    return fetch(updateUserUrl, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: data,
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to update user profile.");
        }
    });
}

export const getFavorite = () => {
    const authToken = localStorage.getItem("authToken");
    const getFavUrl = `${domain}/favorite/`;

    return fetch(getFavUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to get favorite items.");
        }
        return response.json();
    });
}

export const addFavorite = (itemId) => {
    const authToken = localStorage.getItem("authToken");
    const favUrl = `${domain}/favorite/${itemId}`;
    return fetch(favUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to like the item.");
        }
    });
}

export const removeFav = (itemId) => {
    const authToken = localStorage.getItem("authToken");
    const dislikeUrl = `${domain}/favorite/${itemId}`;

    return fetch(dislikeUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to dislilke this item.");
        }
    });
}

export const uploadItem = (data) => {
    const authToken = localStorage.getItem("authToken");
    const uploadItemUrl = `${domain}/items`;

    return fetch(uploadItemUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: data,
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to upload item");
        }
    });
}

export const getAskedItems = () => {
    const authToken = localStorage.getItem("authToken");
    const getAskUrl = `${domain}/asks/`;

    return fetch(getAskUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to get asked items.")
        }
        return response.json();
    });
}

export const cancelAsk = (askId) => {
    const authToken = localStorage.getItem("authToken");
    const cancelUrl = `${domain}/asks/${askId}`;

    return fetch(cancelUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to cancel this ask.");
        }
    });
}