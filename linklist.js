const ATOM_TYPE = 1;
const LIST_TYPE = 2;

llNode = function(whatType, value) {
	return {
		type: whatType,
		key: value,
		forward : null,
		next : null
	};
};

linklist = function() {}
linklist.prototype = {
	head: null,
	tail: null
};

linklist.prototype.append = function(node) {
	if(this.head == null) {
		this.head = node;
		this.tail = this.head;
	} else {
		this.tail.next = node;
		node.forward = this.tail;
		this.tail = node;
	}
};

linklist.prototype.travel = function() {
	
	var ary = this.toArray();
	for(var i=0; i<ary.length; ++i) {
		console.log(ary[i]);
	}

};

linklist.prototype.search = function(value) {
	var ary = this.toArray();
	value = value.toString();

	for(var i=0; i<ary.length; ++i) {
		if(ary[i].toString() == value) {
			return true;
		}
	}

	return false;
}

linklist.prototype.toArray = function(current) {
	var ary = new Array();

	if(current == null) {
		current = this.head;
	}

	while(current != null) {
		switch(current.type) {
			case ATOM_TYPE:
				ary.push(current.key);
			break;
			case LIST_TYPE:
				ary = ary.concat(current.key.toArray());
			break;
		}

		current = current.next;
	}

	return ary;
};

linklist.prototype.linklistTest = function() {
	var L1 = new linklist();
	var L2 = new linklist();
	var L3 = new linklist();

	L1.append(new llNode(ATOM_TYPE, 5));
	L1.append(new llNode(ATOM_TYPE, 4));

	L2.append(new llNode(ATOM_TYPE, 3));
	L2.append(new llNode(ATOM_TYPE, 2));

	L2.append(new llNode(LIST_TYPE, L1));

	L3.append(new llNode(ATOM_TYPE, 1));
	L3.append(new llNode(ATOM_TYPE, 0));

	L2.append(new llNode(LIST_TYPE, L3));

	L2.travel();

};
/*
var a = new linklist;
a.linklistTest();*/