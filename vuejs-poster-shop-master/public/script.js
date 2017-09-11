new Vue({
	// tell Vue where to be anchored in the DOM
	el: '#app',
	data: {
		total: 0,
		items: [
			{ id: 1, title: 'item 1', price: 14.99 },
			{ id: 2, title: 'item 2', price: 4.99 },
			{ id: 3, title: 'item 3', price: 9.99 },
			{ id: 4, title: 'item 4', price: 25.99 },
		],
		cart: [],
		search: '',
	},
	methods: {
		onSubmit: function() {
			// console.log(this.$http);
			this.$http.get('/search/'.concat(this.search)).then(function(res) {
				this.items = res.data;
			});
		},
		addItem: function(index) {
			// console.log(this.items[index].price);
			this.total += this.items[index].price;
			var item = this.items[index];
			var found = false;
			for (var i = 0; i < this.cart.length; i++) {
				if (this.cart[i].id === item.id) {
					found = true;
					this.cart[i].qty++;
					break;
				}
			}
			// this.cart.push(this.items[index]);
			if (!found) {
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: item.price,
				});
			}
		},
		inc: function(item) {
			item.qty++;
			this.total += item.price;
		},
		dec: function(item) {
			item.qty--;
			this.total -= item.price;
			if (item.qty <= 0) {
				for (var i = 0; i < this.cart.length; i++) {
					if (this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
	},
	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		},
	},
});
