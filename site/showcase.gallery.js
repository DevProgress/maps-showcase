(function(){

  if (typeof Showcase == 'undefined') { Showcase = {}; }

  Showcase.Gallery = {

    $Modal: $([]),
    Artworks: [],

    Init: function(){
      this.$Modal = $('.modal');
      $.ajaxSetup({ cache: false });
      $.ajax({
        dataType: "json",
        url: 'artwork.json?v=2',
        success: function(data){
          Showcase.Gallery.Artworks = data;
        },
        error: function(){
          console.log(arguments);
        }
      });
      
      // Bind

      $('.btn-prev', this.$Modal).on('click', function(){
        Showcase.Gallery.Prev();
      });
      $('.btn-next', this.$Modal).on('click', function(){
        Showcase.Gallery.Next();
      });
    },

    Hide: function(id){
      this.$Modal.modal('hide');
    },

    Show: function(id){
      var artwork = _.find(this.Artworks, { id: id });
      if (!artwork){
        artwork = _.first(this.Artworks);
      }

      $(this.$Modal).attr('data-id', artwork.id);
      $('h4', this.$Modal).text(artwork.title);
      $('.modal-body p', this.$Modal).text(artwork.description);
      $('img.artwork', this.$Modal).attr('src', 'img/artwork/' + artwork.id + '.jpg');
      $('img.pattern', this.$Modal).attr('src', 'img/pattern/' + artwork.id + '.jpg');
      this.$Modal.modal('show');
    },

    Next: function(){
      var id = parseInt($(this.$Modal).attr('data-id'));
      var index = _.findIndex(this.Artworks, {id:id});
      var artwork = this.Artworks[index + 1];
      if (!artwork)
        artwork = _.first(this.Artworks);
      this.Show(artwork.id);
    },

    Prev: function(){
      var id = parseInt($(this.$Modal).attr('data-id'));
      var index = _.findIndex(this.Artworks, {id:id});
      var artwork = this.Artworks[index - 1];
      if (!artwork)
        artwork = _.last(this.Artworks);
      this.Show(artwork.id);
    }

  };

  $( document ).ready(function(){
    Showcase.Gallery.Init();
  });

}());