#version 100
precision mediump float;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec3 aCenter;
attribute float aSpecialY;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying mat4 vView;
uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat3 uNormal;
uniform float uTime;
uniform float uSpecialTime;

void main() {
    vColor = aColor;
    vNormal = uNormal * aNormal;
    vPosition = (uWorld * vec4(aPosition, 1.0)).xyz;
    vec3 position = aPosition;
    float waveLengthX = 0.1;
    float waveLengthZ = 0.1;
    float waveHeightX = 2.0;
    float waveHeightZ = 2.0;

    // TODO: throw in one statement
    position.y = position.y
        + sin(uTime + aCenter.x * waveLengthX) * waveHeightX - waveHeightX
        + cos(uTime + aCenter.z * waveLengthZ) * waveHeightZ - waveHeightZ
        + uSpecialTime * aSpecialY * 20.0;

    gl_Position = uProjection * uView * uWorld * vec4(position, 1.0);
}

/* TODO: special events
 * add float attribute that specifies y position on special event
 * pass start time as uniform and calculate elapsed time (use this uniform also to trigger the special event)
 * use elapsed time to interpolate between aPosition.y * wave and special event y position
 * use elapsed time to also interpolate wave to 0 (or small factor)
 */