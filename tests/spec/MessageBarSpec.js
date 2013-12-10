describe('MessageBar', function() {
	var msgBar;

	beforeEach(function() {
		msgBar = new MessageBar();
	});

	afterEach(function(){
		var msgBarNode = document.querySelector('.mb--messagebar');
		if(null !== msgBarNode){
			msgBarNode.parentNode.removeChild(msgBarNode);
		}

	});

	describe('# MessageBar is not initialized', function(){
		it('should throw an error when show message', function() {
			// msgBar;
			expect(function(){
				msgBar.show('MessageBar is not initialized'); 
			}).toThrow('MessageBar is not initialized');
		});
	})

	describe('# MessageBar is initialized', function(){
		
		beforeEach(function() {
			msgBar.initialize();
		});

		it('should be a dom named mb--messagebar in the body', function(){
			expect(document.querySelectorAll('.mb--messagebar').length).toEqual(1);
		});

		it('should not be throw error when call show message', function(){
			expect(function(){
				msgBar.show('should not be throw error when call show message'); 
			}).not.toThrow();
		});

		it('.mb--messagebar element should have class ".mb--messagebar--show"', function(){
			msgBar.show('.mb--messagebar element should have class ".mb--messagebar--show"');
			expect(document.querySelector('.mb--messagebar').classList.contains('mb--messagebar--show')).toEqual(true);
		})

		it('.mb--messagebar element should have class ".mb--messagebar--hide after 5s"', function(){

			var timerCallback = jasmine.createSpy('timerCallback');
			jasmine.Clock.useMock();
			var message_dom = document.querySelector('.mb--messagebar');

			setInterval(function() {
				timerCallback();
			}, 5000);
			
			// show the message
			msgBar.show('.mb--messagebar element should have class ".mb--messagebar--hide after 5s"');
			expect(message_dom.classList.contains('mb--messagebar--show')).toEqual(true);
			expect(message_dom.classList.contains('mb--messagebar--hide')).toEqual(false);
			expect(timerCallback).not.toHaveBeenCalled();


			jasmine.Clock.tick(5000);
			expect(message_dom.classList.contains('mb--messagebar--show')).toEqual(true);
			expect(message_dom.classList.contains('mb--messagebar--hide')).toEqual(true);
			expect(timerCallback).toHaveBeenCalled();

		})

	});

});