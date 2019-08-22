#version 100
precision mediump float;

varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 uLightPosition;
uniform mat4 uView;

void main() {
    vec3 position = (uView * vec4(vPosition, 1.0)).xyz;

    // ambient component
    float ambientStrength = 0.1;
    float specularStrength = 0.5;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambient = ambientStrength * lightColor;
    
    // diffuse component
    vec3 norm = normalize(mat3(uView) * vNormal);
    vec3 lightDir = normalize(uView * vec4(uLightPosition, 1.0) - vec4(position, 1.0)).xyz;
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // specular component
    float shininess = 32.0;
    vec3 viewDir = normalize(-position);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * lightColor;  

    vec3 result = (ambient + diffuse + specular) * vColor;

    gl_FragColor = vec4(result, 1.0);
}