#version 100
precision highp float;

varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vAmbient;
uniform vec3 uLightPosition;
uniform mat4 uView;

void main() {
    vec3 position = (uView * vec4(vPosition, 1.0)).xyz;

    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    
    // diffuse component
    vec3 lightDir = normalize(uView * vec4(uLightPosition, 1.0) - vec4(position, 1.0)).xyz;
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // specular component
    float specularStrength = 0.5;
    float shininess = 32.0;
    vec3 viewDir = normalize(-position);
    vec3 reflectDir = reflect(-lightDir, vNormal);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * lightColor;  

    vec3 result = (vAmbient + diffuse + specular) * vColor;

    gl_FragColor = vec4(result, 1.0);
}