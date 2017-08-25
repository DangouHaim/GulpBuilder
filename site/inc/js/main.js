(function($){

	var inits = [];//array of defined instances

	//looking for elements in field of view
	function inWindow(s){
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		var currentEls = $(s);
		var result = [];
		currentEls.each(function(){
		var el = $(this);
		var offset = el.offset();
		if(scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight))
		  result.push(this);
		});
		return $(result);
	}

	//function for change slide by owl-carousel slider
	function nextSlide(owl){
		owl.trigger('next.owl.carousel');
	}

	//changing slides by interval
	function owlCarouselUpdate(owl, timeStamp){
		var timer = setInterval(function(){
			nextSlide(owl);
		}, timeStamp);
	}
	
	function tagsHandler(sender, e){
		try{
			var l = $(".tags").html().trim();
			var items = $(".type li");
			$(items).each(function(i, e){
				if($(items[i]).html().indexOf(l) > -1){
					$(items[i]).addClass("active");
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	function loadOwlDots(s) {
		var items = s + " .owl-item";
		var dots = s + " .owl-dot";

		$(items).each(function(i, e){
			if($(dots)[i]){
				$(dots)[i].append($(this).find("img").clone(true)[0]);
			}
		});
	}

	function owlBgUpdate (target, bg) {
		$(target).css("backgroundImage", "url(" + $(bg).html() + ")");
	}

	function checkItems(sender, e){
		//init owl carousel if instance not exists
		if((c = inWindow(".slider .owl-carousel").attr("class")) != undefined && inits.indexOf(c.split([" "])[0]) < 0){
			c = c.split([" "])[0];
			try{//catching possible errors
				//loading required scripts
				window.askAPI.loadScript("owlCarousel", function(){
					$("." + c).owlCarousel({
						items: 1,
						nav: true,
						loop: true,
						autoplay: true,
						smartSpeed: 1000,
						navText: []
					});
					//setting up slider update function
					//init slider bg
					owlBgUpdate(".slider", ".slider .active .slide .slider-bg");
					//on owl carousel slide change handler
					$("." + c).on('changed.owl.carousel', function(event) {
						setTimeout(function(){
							owlBgUpdate(".slider", ".slider .active .slide .slider-bg");
						}, 100);
					});
					//owlCarouselUpdate($("." + c), 5000);//auto slide changing
					//initialize owl
					$("." + c + " .owl-nav .owl-prev").addClass("icon-part1");
					$("." + c + " .owl-nav .owl-next").addClass("icon-part2");
					inits.push(c);//push class of defined element
				});
			} catch(error){ console.log(error); }
		}

		if((c = inWindow("div.owl-carousel-bottom").attr("class")) != undefined && inits.indexOf(c.split([" "])[0]) < 0){
			c = c.split([" "])[0];
			askAPI.loadScript("owlCarousel", function(){
				try{
					$("." + c).owlCarousel({
						items: 5,
						nav: true,
						loop: true,
						navText: []
					});
					owlCarouselUpdate($("." + c), 3000);
					$("." + c + " .owl-nav .owl-prev").addClass("icon-part1");
					$("." + c + " .owl-nav .owl-next").addClass("icon-part2");
					inits.push(c);
				} catch(error){ console.log(error); }
			});
		}

		if((c = inWindow(".owl-carousel-catalog").attr("class")) != undefined && inits.indexOf(c.split([" "])[0]) < 0 ){
			c = c.split([" "])[0];
			try{
				window.askAPI.loadScript("owlCarousel", function(){
					$("." + c).owlCarousel({
						items: 1,
						nav: true,
						dotData: true,
						loop: true,
						navText: []
					});

					dots = "." + c + " .owl-dot"; //hide a navigation if only one slide(or none slide)
					if($(dots).length < 2) {

						$("." + c).owlCarousel('destroy');
						$("." + c).owlCarousel({
							items: 1,
							nav: true,
							dotData: true,
							loop: false,
							navText: []
						});
						$(".main-view .carousel").removeClass("dots-margin");
					} else {
						$("." + c).owlCarousel('destroy');
						$("." + c).owlCarousel({
							items: 1,
							nav: true,
							dotData: true,
							loop: true,
							navText: []
						});
						$(".main-view .carousel").addClass("dots-margin");
					}
					
					loadOwlDots("." + c);

					$("." + c + " .owl-nav .owl-prev").addClass("icon-part1");
					$("." + c + " .owl-nav .owl-next").addClass("icon-part2");
					inits.push(c.toString());
				});
			} catch(error){ console.log(error); }
		}

		//loading yandex maps api
		if((c = inWindow("div.view-main-map").attr("class")) != undefined && inits.indexOf(c.split([" "])[0]) < 0 ){
			c = c.split([" "])[0];
			try{
				window.askAPI.loadScript("yandexMaps", function(){


					ymaps.ready(init);
					var myMap,
					  myPlacemark;

					function init(){     
					  myMap = new ymaps.Map("map", {
					      center: [52.451259, 30.997249],
            			zoom: 16
					  });

					  myPlacemark = new ymaps.Placemark([52.451259, 30.997249], { 
					      hintContent: 'Гомель, ул. Кожара 2/260', 
							balloonContent: 'Гомель, ул. Кожара 2/260'
					  });

					  myMap.geoObjects.add(myPlacemark);
					}

					inits.push(c.toString());
				});
			} catch(error){ console.log(error); }
		}
	}

	function menuHandler(sender, e){
		hide = true;
		$(".products").mouseleave(function(){
			hide = true;
			setTimeout(function(){
				if(hide){
					$(".menu-convalution").addClass("hide-item");
				}
				setTimeout(function(){
					if(hide){
						$(".menu-convalution-root").addClass("hidden");
					}
				}, 300);
			}, 300);
		});
		$(".products").mouseover(function(){
			hide = false;
			$(".menu-convalution-root").removeClass("hidden");
			$(".menu-convalution").removeClass("hide-item");
		});
	}

	function onMenuItemClick() {
		$(".types .type ul li span").click(function() {
			location.href = $(this).attr("data");
		});
	}

	function setNoClickableHandler() {
		$(".news-content .link a .text .set-no-clickabe").parents(".link").addClass("no-clickable");
		$(".news-content .link a .text .set-no-clickabe").removeClass("set-no-clickabe");
	}

	function titleWidth() {
		$(".title").each(function(i, e){
			$(this).find(".line").css("width", $(this).find("h2").css("width"));
		});
	}

	function loadingOff() {
		$(".load").removeClass("load");
	}

	$(window).ready(function() {
		loadingOff();
		titleWidth();
		onMenuItemClick();
		setNoClickableHandler();

		//=Lazy load
		sender = "ready";
		menuHandler(sender);
		checkItems(sender);
		tagsHandler(sender);
	});

	$(window).load(function(){
		//=Lazy load
		sender = "load";
		checkItems(sender);
	});

	$(document).on("scroll", function(){
		//=Lazy load
		sender = "scroll";
		checkItems(sender);
	});

})(jQuery)