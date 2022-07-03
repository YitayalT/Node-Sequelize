$(document).ready(function () {


     


    /*--------- Slider Script ----------- */
	 var matches = [];
     var slider = document.getElementById('slider').children;
	 var co = 0;
	 for(var i = 0; i < slider.length; i++) {
     if(slider[i].localName == 'li') {
		 	co++;
		 	var img = slider[i].dataset.background;
		 	var active = slider[i].dataset.active;
		 	if(active == 1){
				matches.push(slider[i]);
		 		slider[i].setAttribute("style", "background-image: url('"+img+"');"); 
				slider[i].setAttribute("id","slid_"+co)
			}else{
				matches.push(slider[i]);
		 		slider[i].setAttribute("style", "background-image: url('"+img+"');display:none"); 
				slider[i].setAttribute("id","slid_"+co)
			}
			
		}
	 }
	
	var prev = 1;
	setInterval(function(e){
		$("#slid_"+prev).fadeOut(100);
		if(prev == co){
			new_pv = 1;
			$("#slid_"+new_pv).fadeIn(1000);
			$("#slid_"+new_pv+" h1").addClass('animation')
			prev = 1;
		}else{
			new_pv = prev+1;
			$("#slid_"+new_pv).fadeIn(1000);
			$("#slid_"+new_pv+" h1").addClass('animation')
			prev++;
		}
		
	},7000)
    
});



$( document ).ready(function() {
    var w = window.innerWidth;
   
    if(w > 767){
        $('#menu-jk').scrollToFixed();
    }else{
        $('#menu-jk').scrollToFixed();
    }
    
})


$( document ).ready(function() {

     $('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        autoplay: true,
        dots: true,
        autoplayTimeout: 5000,
        navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })


});

$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

