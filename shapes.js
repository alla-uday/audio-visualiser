Declare_Any_Class( "Cube",    // A square, demonstrating shared vertices.  On any planar surface, the interior edges don't make any important seams.
  { 'populate': function()      // In these cases there's no reason not to re-use values of the common vertices between triangles.  This makes all the
      {                         // vertex arrays (position, normals, etc) smaller and more cache friendly.
         var side = 0.3;
         var verticesOfCube = [
          vec3( -side, -side,  side),           //0 // left bottom back
          vec3( -side,  side,  side),           //1 // left top back
          vec3(  side,  side,  side),           //2 // right top back
          vec3(  side, -side,  side),           //3 // right bottom back
          vec3( -side, -side, -side),           //4 // left bottom front
          vec3( -side,  side, -side),           //5 // left top front
          vec3(  side,  side, -side),           //6 // right top front
          vec3(  side, -side, -side)            //7 // right bottom front
        ];
          
         this.positions     .push( verticesOfCube[1], verticesOfCube[0], verticesOfCube[3], verticesOfCube[2] ); // Specify the 4 vertices -- the point cloud that our Square needs.
         this.positions     .push( verticesOfCube[2], verticesOfCube[3], verticesOfCube[7], verticesOfCube[6] );
         this.positions     .push( verticesOfCube[3], verticesOfCube[0], verticesOfCube[4], verticesOfCube[7] );
         this.positions     .push( verticesOfCube[6], verticesOfCube[5], verticesOfCube[1], verticesOfCube[2] );         
         this.positions     .push( verticesOfCube[4], verticesOfCube[5], verticesOfCube[6], verticesOfCube[7] );  
         this.positions     .push( verticesOfCube[5], verticesOfCube[4], verticesOfCube[0], verticesOfCube[1] );
          
          
         this.normals       .push( vec3(0,0,1), vec3(0,0,1), vec3(0,0,1), vec3(0,0,1) );     // ...
         this.normals       .push( vec3(1,0,0), vec3(1,0,0), vec3(1,0,0), vec3(1,0,0) );     // ...
         this.normals       .push( vec3(0,-1,0), vec3(0,-1,0), vec3(0,-1,0), vec3(0,-1,0) );     // ...         
         this.normals       .push( vec3(0,1,1), vec3(0,1,0), vec3(0,1,0), vec3(0,1,0) );     // ...
         this.normals       .push( vec3(0,0,-1), vec3(0,0,-1), vec3(0,0,-1), vec3(0,0,-1) );     // ...
         this.normals       .push( vec3(-1,0,0), vec3(-1,0,0), vec3(-1,0,0), vec3(-1,0,0) );     // ...
        
          
          this.texture_coords.push(vec2(0,1), vec2(0,0), vec2(1,0), vec2(1,1));
          this.texture_coords.push(vec2(0,1), vec2(0,0), vec2(1,0), vec2(1,1));
          this.texture_coords.push(vec2(0,1), vec2(0,0), vec2(1,0), vec2(1,1));
          this.texture_coords.push(vec2(0,1), vec2(0,0), vec2(1,0), vec2(1,1));
          this.texture_coords.push(vec2(0,1), vec2(0,0), vec2(1,0), vec2(1,1));
          this.texture_coords.push(vec2(0,1), vec2(0,0), vec2(1,0), vec2(1,1));
          
         this.indices       .push( 0,1,2,0,2,3,    4,5,6,4,6,7,    8,9,10,8,10,11,    12,13,14,12,14,15,     16,17,18,16,18,19,    20,21,22,20,22,23);                                   // Two triangles this time, indexing into four distinct vertices.
      }
  }, Shape )

