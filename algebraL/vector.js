'use strict';
var pscalar = require( './pscalar' );
var sum = require( './sum' );
var crossp = require( './crossp' );
var dotp = require( './dotp' );
var toArray = require( './toArray' )
    /** @constructor
     * Constructor of a Vector.
     * @param {Array} of way [x_1,x_2,..x_n] only three dimension are supported.
     */
let Vector = function ( array, dim ) {
    var Matrix = require( './Mat' );
    array = ( typeof array === 'object' ) && !Array.isArray( array ) ? toArray( array ) : array
    if ( !( this instanceof Vector ) ) {
        return new Vector( array )
    }
    if ( !array ) {
        return;
    }
    this._ = function ( i ) {
        return this.matrix._( i, 1 )
    }
    this._array = array;
    this.dim = dim || array.length
    let _array = [ ];
    for ( let i = 0; i < this.dim; i++ ) {
        _array[ i ] = [ array[ i % array.length ] ];
    }
    // Vector are behave as this.dimx1 matrix
    this.matrix = new Matrix( _array, this.dim, 1 );
    this.array = this.matrix.array;
    // Define the sum method.
    this.sum = function ( A ) {
        let __array = sum( this.matrix, A.matrix ).array;
        let _array = [ ];
        for ( let i = 0; i < this.dim; i++ ) {
            _array[ i ] = __array[ i ][ 0 ];
        }
        return new Vector( _array );
    };
    // Define the product by a scalar method.
    this.pscalar = function ( a ) {
        let __array = pscalar( a, this.matrix ).array;
        let _array = [ ];
        for ( let i = 0; i < this.dim; i++ ) {
            _array[ i ] = __array[ i ][ 0 ];
        }
        return new Vector( _array );
    };
    // Define the map over the Vector.
    this.map = function ( cb ) {
        let __array = this.matrix.array;
        let _array = [ ];
        for ( let i = 0; i < this.dim; i++ ) {
            _array[ i ] = cb( __array[ i ][ 0 ], i );
        }
        return new Vector( _array );
    };
    // Define the dot product method.
    this.dot = function ( A ) {
        return dotp( A, this );
    };
    // Define the filter method
    this.filter = function ( map ) {
        return this.matrix.filter( map );
    };
    // Define the cross product method
    this.cross = function ( ) {
        var arg = Array.prototype.slice.call( arguments )
        arg.unshift( this )
        return crossp( arg );
    };
};
// Define the class method dotp.
Vector.dotp = dotp;
// DEfine the class method sum.
Vector.sum = function ( A, B ) {
    let __array = sum( B.matrix, A.matrix ).array;
    let _array = [ ];
    for ( let i = 0; i < this.dim; i++ ) {
        _array[ i ] = __array[ i ][ 0 ];
    }
    return new Vector( _array );
};
// Define the product by a scalar class method.
Vector.pscalar = function ( a, B ) {
    let __array = pscalar( a, B.matrix ).array;
    let _array = [ ];
    for ( let i = 0; i < this.dim; i++ ) {
        _array[ i ] = __array[ i ][ 0 ];
    }
    return new Vector( _array );
};
// Define the cross producto class method.
Vector.crossp = crossp;
Vector.create_n = function ( n, map ) {
    let i, array = [ ];
    for ( i = 0; i < n; i++ ) {
        array[ i ] = map( i );
    }
    return new Vector( array );
};
//Define the mapping class method.
Vector.map = function ( cb, B ) {
    let __array = B.matrix.array;
    let _array = [ ];
    for ( let i = 0; i < this.dim; i++ ) {
        _array[ i ] = cb( __array[ i ][ 0 ], i );
    }
    return new Vector( _array );
};
module.exports = Vector;
