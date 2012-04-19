$(function(){

  var template = 
    '<div class="edges">'+
      '<svg id="edgesSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'+
    '</div>'+
    '<div class="nodes" />';

  Iframework.GraphView = Backbone.View.extend({
    tagName: "div",
    className: "graph",
    template: _.template(template),
    events: {
      "click": "click"
    },
    initialize: function () {
      this.render();
      Iframework.$el.prepend(this.el);

      this.model.get("nodes").each(this.addNode);

      this.resizeEdgeSVG();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    click: function (event) {
      // Hide dis/connection boxes
      $(".edge-edit").remove();
      Iframework.selectedPort = null;
      
      // Unactivate modules
      $("div.module").removeClass("active");
    },
    addNode: function (node) {
      this.$(".nodes").append( node.initializeView().el );
    },
    addEdge: function (edge) {
      edge.initializeView();

      if (edge.source.view) {
        edge.source.view.resetRelatedEdges();
      }
      if (edge.target.view) {
        edge.target.view.resetRelatedEdges();
      }
    },
    removeNode: function (node) {
      if (node.view) {
        node.view.$el.remove();
      }
    },
    removeEdge: function (edge) {
      if (edge.view) {
        edge.view.remove();
      }
      
      if (edge.source.view) {
        edge.source.view.resetRelatedEdges();
      }
      if (edge.target.view) {
        edge.target.view.resetRelatedEdges();
      }
    },
    resizeEdgeSVG: function () {
      var width = 0;
      var height = 0;
      this.model.get('nodes').each(function(node){
        var thisRight = node.get('x') + node.get('w');
        if ( thisRight > width ) {
          width = thisRight;
        }
        var thisBottom = node.get('y') + node.get('h');
        if ( thisBottom > height ) {
          height = thisBottom;
        }
      }, this);
      width += 150;
      height += 50;
      this.$('#edgesSvg').css({
        "width":width,
        "height":height,
      });
    }
    
  });

});
