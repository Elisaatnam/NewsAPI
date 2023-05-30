const apiKey = "9c21d6508c5145faa084fc015471e73e";
const headlineSection = document.querySelector(".top-headlines");
const searchResultSection = document.querySelector(".search-results");
const getNewsBtn = document.querySelector("button");
const backToTop = document.querySelector("#to-top-btn");

//TOP HEADLINES
fetch(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
	.then(res => res.json())
	.then(data => {
		console.log(data);
		console.log(data.articles);
		const headlineArticles = data.articles;
		headlineArticles.forEach((articleArray, index) => {
			const title = articleArray.title;
			const image = articleArray.urlToImage;
			const description = articleArray.description;
			const url = articleArray.url;
			const content = articleArray.content;

			let gridColumn = "1 / 2"; // Set the default grid column for normal articles
			let articleClass = "article-small"; // Set the default class for smaller articles

			if (index % 4 === 0) {
				gridColumn = "1 / 5"; // Set the grid column for the big article
				articleClass = "article-big"; // Set the class for the larger article
			} else if (index % 4 === 1 || index % 4 === 2 || index % 4 === 3) {
				gridColumn = `${(index % 4) + 1} / ${(index % 4) + 2}`; // Set the grid column for the small articles
			}

			const html = `<article class="${articleClass}" style="grid-column: ${gridColumn}"><a href="${url}"><div class="image-container" style="background: url('${image}') no-repeat center"></div><h3>${title}</h3><p>${description}</p></a></article>`;
			headlineSection.insertAdjacentHTML("beforeend", html);
		});
	})
	.catch(err => {
		console.log(`Fehler: ${err}`);
	});

//SEARCH FUNCTION
getNewsBtn.addEventListener("click", () => {
	const searchTerm = document.querySelector("input").value;
	const lang = document.querySelector("select").value;

	// Clear previous search results
	searchResultSection.innerHTML = "";

	// Check if the h2 element exists
	const existingH2 = document.querySelector(".result-h2");
	if (existingH2) {
		// Reset the content of the existing h2
		existingH2.innerHTML = `Results for ${searchTerm}`;
	} else {
		// Create a new h2 element
		const resultH2 = document.createElement("h2");
		resultH2.className = "result-h2";
		resultH2.innerHTML = `Results for ${searchTerm}`;
		searchResultSection.insertAdjacentElement("beforebegin", resultH2);
	}

	fetch(
		`https://newsapi.org/v2/everything?q=${searchTerm}&language=${lang}&apiKey=${apiKey}`,
	)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const searchArticles = data.articles;
			searchArticles.forEach((articleArray, index) => {
				const title = articleArray.title;
				const image = articleArray.urlToImage;
				const description = articleArray.description;
				const url = articleArray.url;
				const content = articleArray.content;

				let gridColumn = "1 / 2"; // Set the default grid column for normal articles
				let articleClass = "article-small"; // Set the default class for smaller articles

				if (index % 4 === 0) {
					gridColumn = "1 / 5"; // Set the grid column for the big article
					articleClass = "article-big"; // Set the class for the larger article
				} else if (index % 4 === 1 || index % 4 === 2 || index % 4 === 3) {
					gridColumn = `${(index % 4) + 1} / ${(index % 4) + 2}`; // Set the grid column for the small articles
				}

				const html = `<article class="${articleClass}" style="grid-column: ${gridColumn}"><a href="${url}"><div class="image-container" style="background: url('${image}') no-repeat center"></div><h3>${title}</h3><p>${description}</p></a></article>`;
				searchResultSection.insertAdjacentHTML("beforeend", html);
			});

			// Scroll to the search result section
			document
				.querySelector(".result-h2")
				.scrollIntoView({ behavior: "smooth" });
		})
		.catch(err => {
			console.log(`Fehler: ${err}`);
		});
});

// Scroll to Top Button
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTop.style.display = "block";
	} else {
		backToTop.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
backToTop.addEventListener("click", () => {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
