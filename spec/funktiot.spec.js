
/*describe('on load functions', function(){
    it('sould have a div hidden when page is loaded', function(){
        expect();
    });*/
describe('gets cats', function(){
    it('should get the new cat', function(){
        expect(kissa.getNewCat()).toBe(true);
    });
    it('should get the cat by its ID', function(){
        expect(kissa.getCatById()).toBe(true);
    });
});

    

/*describe('on load functions', function(){
    it('sould have a div hidden when page is loaded', function(){
        expect();
    });
describe('on load functions', function(){
    it('sould have a div hidden when page is loaded', function(){
        expect();
    });
describe('on load functions', function(){
    it('sould have a div hidden when page is loaded', function(){
        expect();
    });
describe('on load functions', function(){
    it('sould have a div hidden when page is loaded', function(){
        expect();
    });

});
});
}*/
    
    
    /*describe("notes module", function () {

    beforeEach(function() {
    notes.clear();
    notes.add('first note');
    notes.add('second note');
    notes.add('third note');
    notes.add('fourth note');
    notes.add('fifth note');
        
    });

    describe('adding a note', function() {

        it("should be able to add a new note", function () {
    expect(notes.add('sixth note')).toBe(true);
    expect(notes.count()).toBe(6);
});
  it("should ignore blank notes", function () {
    expect(notes.add('')).toBe(false);
    expect(notes.count()).toBe(5);
});

 it('should ignore notes containing only whitespace', function() {
    expect(notes.add('   ')).toBe(false);
    expect(notes.count()).toBe(5);
});

it('should require a string parameter', function() {
    expect(notes.add()).toBe(false);
    expect(notes.count()).toBe(5);
});

    describe('deleting a note', function() {
        it('should be able to delete the first index', function() {
            expect(notes.remove(0)).toBe(true);
            expect(notes.count()).toBe(4);
        });
        it('should be able to delete the last index', function() {
            expect(notes.remove(4)).toBe(true);
            expect(notes.count()).toBe(4);
        });
        
        it('should return false if index is out of range',function() {
            expect(notes.remove(notes.count())).toBe(false);
            expect(notes.count()).toBe(5);
        });
        
        it('should return false if the parameter is missing',function(){
        expect(notes.remove()).toBe(false);
            expect(notes.count()).toBe(5);
        });
    }); 
    describe('finding a note', function() {
        it('should be able to search the "note"',function() {
            expect(notes.find("note")).toBe(true);
            expect(notes.count()).toBe(5);
        });
        it('should be able to search the "Note"',function() {
            expect(notes.find("Note")).toBe(false);
            expect(notes.count()).toBe(5);
        });
        it('should be able to search the "th"',function() {
            expect(notes.find("th")).toBe(true);
            expect(notes.count()).toBe(5);
           
        });
        it('should be able to search the "four"',function() {
            expect(notes.find("four")).toBe(true);
            expect(notes.count()).toBe(5);
        });
        it('should be able to search the "six"',function() {
            expect(notes.find("six")).toBe(false);
            expect(notes.count()).toBe(5);
        });
        it('should be able to search the blank',function() {
            expect(notes.find(" ")).toBe(true);
            expect(notes.count()).toBe(5);
        });
        it('should be able to search the missing parameter',function() {
            expect(notes.find()).toBe(false);
            expect(notes.count()).toBe(5);
        });





    }); 
    
});

});
*/