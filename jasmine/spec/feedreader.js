/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
// I learn about the test function from https://devhints.io/jasmine.

// We're placing all of our tests within the $() function

$(function () {
    /* This is  first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* it tests to make sure that the lFeeds variable has been
         * defined, and that it is not empty.
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* it tests that each feed in the allFeeds and ensures
         * it has a URL defined and the URL is not empty.
         */
        it('URL defined and not empty', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* it tests that each feed in the allFeeds and ensures
         * it has a name defined and that the name is not empty.
         */
        it('name defined and not empty', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* a test for "The menu"  to check it hidden by default, and
    *  changes visibility when the menu icon is clicked.
    */
    describe('The menu', function () {
        let theClassName = document.querySelector('body');
        /* it tests that ensures the menu element is hidden by default.
         */
        it('is hidden by default', function () {
            expect(theClassName.classList.contains('menu-hidden')).toBe(true)
        });

        /* it tests that ensures the menu changes visibility when the
         * menu icon is clicked.
         */
        it('changes visibility when the menu icon is clicked', function () {
            let clickIcon = document.querySelector('.menu-icon-link');
            clickIcon.click();
            expect(theClassName.classList.contains('menu-hidden')).toBe(false)

            clickIcon.click();
            expect(theClassName.classList.contains('menu-hidden')).toBe(true)
        });
    });

    /* a test for "Initial Entries" to check loadFeed function is called
    * and completes its work.
    */
    describe('Initial Entries', function () {
        /* it tests that ensures when the loadFeed function is called
         * and completes its work, there is at least a single .entry
         * element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        it('loadFeed is called and complete', function () {
            //let isFeed = document.querySelector('.feed');
            expect($('.feed .entry').length > 0).toBe(true);
        });
    });

    /* a test suite named "New Feed Selection" to check a new feed
    * is loaded the content actually changes
    */
    describe('New Feed Selection', function () {
        /* it tests that ensures when a new feed is loaded by the
         * loadFeed function that the content actually changes.
         */
        let isFeed = document.querySelector('.feed');
        let oldF, newF;
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldF = isFeed.textContent;
                loadFeed(1, function () {
                    done();
                });

            });
        });
        it('the content actually changes between feeds', function () {
            newF = isFeed.textContent;
            expect(oldF != newF).toBe(true);
        });
    });


}());
