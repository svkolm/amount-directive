angular.module('amountService', [])

  .factory('amount', function () {
    var Amount = {
      init: function (values, property) {
        this.values = values || [];
        this.property = property || 'value';
        this.edited = null;
        this.oldValue = null;
        this.total = 0;

        for (var i = 0; i < this.size(); i++) {
          this.total += this.values[i][this.property];
        }
        return this;
      },

      size: function () {
        return this.values.length;
      },

      isAdded: function () {
        return this.isEdited() && this.oldValue === null;
      },

      add: function () {
        this.cancel();
        this.values.unshift({});
        this.edited = 0;
        this.oldValue = null;
      },

      isEdited: function (index) {
        return index === undefined ? this.edited !== null
          : this.edited === index;
      },

      edit: function (index) {
        this.cancel();
        this.edited = index;
        this.oldValue = this.editedValue();
      },

      editedValue: function () {
        return parseFloat(this.values[this.edited][this.property]);
      },

      editValue: function (value) {
        this.values[this.edited][this.property] = value;
      },

      isCorrect: function () {
        return !isNaN(this.editedValue());
      },

      save: function () {
        if (this.isEdited() && this.isCorrect()) {
          var newValue = this.editedValue();
          this.editValue(newValue);
          this.total += newValue;

          if (this.oldValue !== null) {
            this.total -= this.oldValue;
          }
          this.edited = null;
        }
      },

      remove: function (index) {
        this.cancel();
        this.total -= this.values.splice(index, 1)[0][this.property];
      },

      cancel: function () {
        if (this.isEdited()) {
          if (this.oldValue !== null) {
            this.editValue(this.oldValue);
          }
          else {
            this.values.splice(this.edited, 1);
          }
          this.edited = null;
        }
      }
    };

    return function() {
      return Object.create(Amount);
    };
  });
