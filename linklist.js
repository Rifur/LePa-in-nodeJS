const ATOM_TYPE = 1;
const LIST_TYPE = 2;

exports.ATOM_TYPE = ATOM_TYPE;
exports.LIST_TYPE = LIST_TYPE;

exports.llNode = function(whatType, value) {
	return {
		type: whatType,
		key: value,
		forward : null,
		next : null
	};
};

exports.linklist = function () {};
exports.linklist.prototype = {
	head: null,
	tail: null
};

exports.linklist.prototype.append = function(node) {
	if(this.head == null) {
		this.head = node;
		this.tail = this.head;
	} else {
		this.tail.next = node;
		node.forward = this.tail;
		this.tail = node;
	}
};

exports.linklist.prototype.travel = function(current, parent) {
	if(current == null) {
		if(parent == null) {
			current = this.head;
		} else {
			return;
		}
	} else if(current == parent) {
		return;
	}

	switch(current.type) {
	case ATOM_TYPE: 
		{
			console.log(current.key);
			parent = current;
			current = current.next;
		}
	break;
	case LIST_TYPE:
		{
			current.key.travel();
			parent = current;
			current = current.next;
		}
	break;
	}

	this.travel(current, parent);

};

function linklistTest()
{
	var L1 = new linklist();
	var L2 = new linklist();
	var L3 = new linklist();

	L1.append(new llNode(ATOM_TYPE, 5));
	L1.append(new llNode(ATOM_TYPE, 4));

	L2.append(new llNode(ATOM_TYPE, 3));
	L2.append(new llNode(ATOM_TYPE, 2));

	L2.append(new llNode(LIST_TYPE, L3));

	L3.append(new llNode(ATOM_TYPE, 1));
	L3.append(new llNode(ATOM_TYPE, 0));

	L2.append(new llNode(LIST_TYPE, L1));

	L2.travel();
}

