
$(document).ready(function () {

	function capitalize(string){
		return string[0].toUpperCase() + string.slice(1).toLowerCase();
	}	
 
	function create_modal_window(user){

		let $fullName = `${capitalize(user.name.first)} ${capitalize(user.name.last)}`;
		let $address = `${user.location.street}, ${user.location.state} ${user.location.postcode}`;
		let $email = user.email;
		let $cell = `(${user.cell.slice(0,3)}) ${user.cell.slice(4,7)}-${user.cell.slice(8,12)}`;
		let $dob = user.dob.slice(0,10);
		let $birthday = `${$dob.slice(5,7)}/${$dob.slice(8,10)}/${$dob.slice(2,4)}`;
		let modalWindowContent = 
				`<div class ="modalWindow">
					<div class="modalContent">
						<span class="close">&times;</span>
							<div class="modal_top_section">
								<img src="${user.picture.large}">
								<p class="name">${$fullName}</p>
								<p class="email">${$email}</p>
								<p>${user.location.city}</p>
							</div>
							<div class="modal_bottom_section">
								<p>${$cell}</p>
								<p>${$address}</p>
								<p>Birthday: ${$birthday}</p>
							</div>
					<button class='prevBtn'>Prev</button>
					<button class='nextBtn'>Next</button>
					</div>
				</div>`;
		return modalWindowContent;
	}

	function create_li(user, index){

			// console.log(user);
			// console.log(typeof user.dob);
		    let fullName = `${capitalize(user.name.first)} ${capitalize(user.name.last)}`;
		    return `<li class="employee">
		    					<img src="${user.picture.large}">
		    					<div class="info">
			    					<h3 class="name">${fullName}</h3>
			    					<p class="details">${user.email}</p>
			    					<p class="details">${capitalize(user.location.city)}</p>
		    					</div>
		    					${create_modal_window(user)}
		    					</li>
		    					`;
	}

	function displaySearchedItems($search_value){

		let list = document.querySelectorAll('.employee');

		for(i=0; i < list.length; i++){
			
			name = list[i].querySelector('.info .name').textContent;
			if(!name.includes($search_value)){
				$(list[i]).hide();
			} else {
				$(list[i]).show();
			}
		}
	}

	$('form').submit(function(event){
		event.preventDefault();
		$search_value = $('#search').val();
		displaySearchedItems($search_value, users);

	});

	$.ajax({
	  url: 'https://randomuser.me/api?results=12&nat=US',
	  dataType: 'json',
	  success: function(userdata) {
	  	users = userdata.results;

		  	// Create 12 employee list.

		  	for(i=0; i<users.length; i++){

			    $('#employeeList').append(create_li(users[i], i));
			    $($('.modalWindow')[i]).hide();

		  	}

		  	// 12 Employees created.

		  	$('.employee').click(function(event){

		  		let modalWindow = $(this).children('.modalWindow')[0];
		  		$(modalWindow).show();

		  	});	    

			$('.modalWindow').click(function(event){
		    	let target = event.target;
		    	if(target.nodeName == 'SPAN'){
		    		$(this).hide();
		    		event.stopPropagation();
		    	}
		    });

			$('.prevBtn').click(function($event){ 

				$currentLi = $($event.target.parentNode.parentNode.parentNode);
				$previousLi = $currentLi.prev();
				$prevModalWindow = $previousLi.find('.modalWindow');
				$currModalWindow = $($event.target.parentNode.parentNode);
				$currModalWindow.hide();
				$prevModalWindow.show();
				event.stopPropagation();
				
			});

			$('.nextBtn').click(function($event){ 

				console.log($event.target);
				$currentLi = $($event.target.parentNode.parentNode.parentNode);
				$nextLi = $currentLi.next();
				$nextModalWindow = $nextLi.find('.modalWindow');
				$currModalWindow = $($event.target.parentNode.parentNode);
				$currModalWindow.hide();
				$nextModalWindow.show();
				event.stopPropagation();

			});

	  	}

	});




});