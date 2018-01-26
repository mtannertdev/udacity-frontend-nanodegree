/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        // Check to make sure all the feeds are properly defined.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Loop through each feed in the allFeeds object and ensure it has
		// a URL defined and that the URL is not empty.
		it('has urls that are defined and not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length !== 0).toBe(true);
			})
		});

        // Loop through each feed in the allFeeds object and ensure it has
		// a name defined and that the name is not empty.
		it('has names and are not null', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length !== 0).toBe(true);
			})
		});

	});


	/* Test suite: "The menu" */
	describe('The menu', function() {

		// Ensures the menu element is hidden by default.
		it('has the menu element hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		// Ensures the menu changes visibility when the menu icon is clicked.
		it('changes visibility when the menu icon is clicked', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);

			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

	});
	
	
    /* Test suite: "Initial Entries" */
	describe('Initial Entries', function() {
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		
        // Ensure when the loadFeed function is called and completes its work,
		// there is at least a single .entry element within the .feed container.
		it('has at least a single entry', function(done) {
			expect($('.feed .entry').length !== 0).toBe(true);
			done();
		});

   });

    /* Test suite: "New Feed Selection" */
	describe('New Feed Selection', function() {
		
		var oldfeed, newfeed;
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				oldfeed = $('.feed').html();
				loadFeed(1, function() {
					$newfeed = $('.feed').html();
					done();
				});
			});
		});

        // Ensure when a new feed is loaded by the loadFeed function that
		// the content actually changes.
		it('changes content when a new feed is loaded', function() {
			expect(oldfeed !== newfeed).toBe(true);
		});

	 });

}());
